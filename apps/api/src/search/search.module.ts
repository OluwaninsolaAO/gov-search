import { Module, OnModuleInit } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { env } from 'env.config';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { OpenAIModule } from 'src/common/openai/openai.module';
@Module({
  imports: [
    ElasticsearchModule.register({
      // nodes: env.ELASTICSEARCH_NODES,
      cloud: {
        id: env.ELASTICSEARCH_CLOUD_ID,
      },
      auth: {
        apiKey: env.ELASTICSEARCH_API_KEY,
      },
    }),
    OpenAIModule,
  ],
  providers: [SearchService],
  controllers: [SearchController],
})
export class SearchModule implements OnModuleInit {
  constructor(private readonly searchService: SearchService) {}
  async onModuleInit() {
    await this.searchService.createPeopleIndex();
    await this.searchService.ingestPeopleData();
  }
}
