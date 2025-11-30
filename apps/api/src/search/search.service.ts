import { Injectable, Logger } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { IndicesCreateRequest } from 'node_modules/@elastic/elasticsearch/lib/api/types';
import dataset from 'datasets/people.json';
import { mappingConfiguration } from './mappings';
import { InjectOpenAI } from 'src/common/openai/openai.module';
import { OpenAI } from 'openai/client.js';
import { zodTextFormat } from 'openai/helpers/zod';
import { QueryAISchema } from './entities/zod.schema';

type SearchOptions = {
  query: string;
  limit: number;
  offset: number;
};

@Injectable()
export class SearchService {
  private readonly logger = new Logger(SearchService.name);
  private readonly index: string = 'gov_search_people';

  constructor(
    private readonly esService: ElasticsearchService,
    @InjectOpenAI private readonly openAi: OpenAI,
  ) {}

  async createPeopleIndex() {
    const index = this.index;
    try {
      const exists = await this.esService.indices.exists({ index });
      if (exists) {
        this.logger.log(`Index '${index}' already exists.`);
        return;
      }
      const indexDefinition: IndicesCreateRequest = {
        index,
        ...mappingConfiguration,
      };
      const response = await this.esService.indices.create(indexDefinition);
      this.logger.log(`Index '${index}' created successfully`, response);
    } catch (error: unknown) {
      this.logger.error(`Error creating index '${index}'`, error);
    }
  }

  async ingestPeopleData() {
    const people = dataset as { id: string }[];
    this.logger.log(
      `Starting bulk ingestion of ${people.length} people into '${this.index}'`,
    );
    const operations = people.flatMap((person) => [
      {
        index: {
          _index: this.index,
          _id: person.id,
        },
      },
      person,
    ]);

    try {
      const response = await this.esService.bulk({
        operations,
        refresh: true,
      });
      if (response.errors) {
        // If there were any errors during indexing
        const failedOperations = response.items.filter((item) => {
          const { index } = item;
          if (index) return index.status >= 400;
          return false;
        });
        this.logger.error(
          `Bulk ingestion partially failed! ${failedOperations.length} items failed.`,
        );
        // Optional: Log the first few errors for debugging
        this.logger.error(
          'First few bulk errors:',
          failedOperations.slice(0, 5),
        );
        return;
      }
      this.logger.log(
        `Bulk ingestion completed. Successfully indexed ${people.length} documents.`,
      );
    } catch (error: unknown) {
      this.logger.error(
        `Fatal error during bulk ingestion to '${this.index}'`,
        error,
      );
    }
  }

  async searchPeople({ query, limit, offset }: SearchOptions) {
    const result = await this.esService.search({
      index: this.index,
      from: offset,
      size: limit,
      query: {
        multi_match: {
          query,
          fields: [
            // Primary identity fields (highest boost)
            'name^3',
            'official_name^3',
            'name.keyword^2',
            'official_name.keyword^2',

            // Alternative names and aliases
            'other_names^2',
            'slug^1.5',

            // Contact and digital identity
            'contact.email.value^2',
            'contact.twitter.value^2',
            'contact.instagram.value^2',
            'contact.facebook.value^2',
            'contact.phone.value',

            // Geographic and administrative
            'state^1.5',
            'area.place.name^1.5',
            'area.state_place.name^1.5',
            'area.place_url',
            'address.postal_address.value',
            'address.district.value',

            // Professional and political information
            'position^2',
            'party^1.5',
            'legislative_period',

            // Document and reference content
            'summary_doc.title^2',
            'summary_doc.body',
            'summary_doc.author',

            // Identifiers and codes
            'area.place.codes.poll_unit',
            'area.place.type_name',
            'area.place.country_name',
            'identifiers.official_position.value',

            // External references and URLs
            'url',
            'links.website.url',
            'links.wikipedia.url',
          ],
          type: 'best_fields',
          operator: 'or',
          fuzziness: 'AUTO',
          prefix_length: 0,
          tie_breaker: 0.3,
        },
      },
    });
    const { took } = result;
    return {
      took,
      results: result.hits.hits.map((hit) => hit._source),
    };
  }

  async searchAI(query: string) {
    const { results } = await this.searchPeople({
      query,
      limit: 10,
      offset: 0,
    });

    const baseInstructions = `You are to provide an extensive answer to user questions as a Nigerian Government Directory Assistance related to the search results data provided, do not state anything outside the search results; if you cannot provide answer from the provided sources just state that you do not have enough information to answer the question. Reference *all the sources from the search results and rate each resources based on how relevant they are to the user question on the scale of 0.0 (Not relevant) to 1.0 (Relevant), and finally suggests a list of follow up questions users may be interested in following up thier prompt and related to Government Directory in Nigeria.`;
    const dataSource = JSON.stringify(results, null, 2);
    const fullSystemMessage = `
    ${baseInstructions}

    ### Relevant Search Results
    ${dataSource}
    `;

    const response = await this.openAi.responses.parse({
      model: 'gpt-4.1-mini',
      input: [
        {
          role: 'system',
          content: [{ type: 'input_text', text: fullSystemMessage }],
        },
        {
          role: 'user',
          content: [
            {
              type: 'input_text',
              text: query,
            },
          ],
        },
      ],
      text: {
        format: zodTextFormat(QueryAISchema, 'query_ai_schema'),
      },
    });

    const data = response.output_parsed as QueryAISchema;
    return {
      ...data,
      officials: results,
    };
  }
}
