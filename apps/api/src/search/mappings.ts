import { IndicesCreateRequest } from '@elastic/elasticsearch/lib/api/types';

export const mappingConfiguration: Pick<
  IndicesCreateRequest,
  'settings' | 'mappings'
> = {
  settings: {
    number_of_shards: 1,
    number_of_replicas: 1,
    analysis: {
      analyzer: {
        standard_analyzer: {
          type: 'standard',
        },
        autocomplete_analyzer: {
          type: 'custom',
          tokenizer: 'standard',
          filter: ['lowercase', 'stop'],
        },
      },
    },
  },
  mappings: {
    properties: {
      id: {
        type: 'keyword',
        index: true,
      },
      title: {
        type: 'text',
        analyzer: 'standard_analyzer',
      },
      name: {
        type: 'text',
        fields: {
          keyword: {
            type: 'keyword',
          },
        },
        analyzer: 'standard_analyzer',
      },
      official_name: {
        type: 'text',
        fields: {
          keyword: {
            type: 'keyword',
          },
        },
        analyzer: 'standard_analyzer',
      },
      state: {
        type: 'keyword',
      },
      area: {
        type: 'object',
        properties: {
          place: {
            type: 'object',
            properties: {
              parent_area: {
                type: 'keyword',
              },
              generation_high: {
                type: 'integer',
              },
              all_names: {
                type: 'object',
                enabled: false,
              },
              id: {
                type: 'integer',
              },
              codes: {
                type: 'object',
                properties: {
                  poll_unit: {
                    type: 'keyword',
                  },
                },
              },
              name: {
                type: 'text',
                fields: {
                  keyword: {
                    type: 'keyword',
                  },
                },
              },
              country: {
                type: 'keyword',
              },
              type_name: {
                type: 'keyword',
              },
              generation_low: {
                type: 'integer',
              },
              country_name: {
                type: 'keyword',
              },
              type: {
                type: 'keyword',
              },
            },
          },
          place_url: {
            type: 'keyword',
          },
          url: {
            type: 'keyword',
          },
          image: {
            type: 'object',
            properties: {
              url: {
                type: 'keyword',
                index: false,
              },
            },
          },
          parent_place: {
            type: 'object',
            properties: {
              parent_area: {
                type: 'keyword',
              },
              generation_high: {
                type: 'integer',
              },
              all_names: {
                type: 'object',
                enabled: false,
              },
              id: {
                type: 'integer',
              },
              codes: {
                type: 'object',
              },
              name: {
                type: 'keyword',
              },
              country: {
                type: 'keyword',
              },
              type_name: {
                type: 'keyword',
              },
              generation_low: {
                type: 'integer',
              },
              country_name: {
                type: 'keyword',
              },
              type: {
                type: 'keyword',
              },
            },
          },
          state_place: {
            type: 'object',
            properties: {
              parent_area: {
                type: 'keyword',
              },
              generation_high: {
                type: 'integer',
              },
              all_names: {
                type: 'object',
                enabled: false,
              },
              id: {
                type: 'integer',
              },
              codes: {
                type: 'object',
                properties: {
                  poll_unit: {
                    type: 'keyword',
                  },
                },
              },
              name: {
                type: 'text',
                fields: {
                  keyword: {
                    type: 'keyword',
                  },
                },
              },
              country: {
                type: 'keyword',
              },
              type_name: {
                type: 'keyword',
              },
              generation_low: {
                type: 'integer',
              },
              country_name: {
                type: 'keyword',
              },
              type: {
                type: 'keyword',
              },
            },
          },
        },
      },
      party: {
        type: 'keyword',
      },
      birth_date: {
        type: 'text',
      },
      gender: {
        type: 'keyword',
      },
      slug: {
        type: 'keyword',
      },
      url: {
        type: 'keyword',
      },
      summary_doc: {
        type: 'object',
        properties: {
          title: {
            type: 'text',
            analyzer: 'standard_analyzer',
          },
          slug: {
            type: 'keyword',
          },
          published: {
            type: 'text',
          },
          featured: {
            type: 'boolean',
          },
          url: {
            type: 'keyword',
          },
          author: {
            type: 'keyword',
          },
          body: {
            type: 'text',
            analyzer: 'standard_analyzer',
          },
        },
      },
      address: {
        type: 'object',
        properties: {
          postal_address: {
            type: 'object',
            properties: {
              type: {
                type: 'keyword',
              },
              value: {
                type: 'text',
                analyzer: 'standard_analyzer',
              },
            },
          },
          district: {
            type: 'object',
            properties: {
              type: {
                type: 'keyword',
              },
              value: {
                type: 'text',
                analyzer: 'standard_analyzer',
              },
            },
          },
        },
      },
      other_names: {
        type: 'text',
        analyzer: 'standard_analyzer',
      },
      contact: {
        type: 'object',
        properties: {
          phone: {
            type: 'object',
            properties: {
              type: {
                type: 'keyword',
              },
              value: {
                type: 'keyword',
              },
              note: {
                type: 'text',
              },
            },
          },
          email: {
            type: 'object',
            properties: {
              type: {
                type: 'keyword',
              },
              value: {
                type: 'keyword',
              },
              note: {
                type: 'keyword',
              },
            },
          },
          facebook: {
            type: 'object',
            properties: {
              type: {
                type: 'keyword',
              },
              value: {
                type: 'keyword',
              },
              note: {
                type: 'text',
              },
            },
          },
          twitter: {
            type: 'object',
            properties: {
              type: {
                type: 'keyword',
              },
              value: {
                type: 'keyword',
              },
              note: {
                type: 'keyword',
              },
            },
          },
          instagram: {
            type: 'object',
            properties: {
              type: {
                type: 'keyword',
              },
              value: {
                type: 'keyword',
              },
              note: {
                type: 'keyword',
              },
            },
          },
        },
      },
      images: {
        type: 'object',
        properties: {
          thumbnail: {
            type: 'object',
            properties: {
              url: {
                type: 'keyword',
                index: false,
              },
            },
          },
          medium: {
            type: 'object',
            properties: {
              url: {
                type: 'keyword',
                index: false,
              },
            },
          },
          original: {
            type: 'object',
            properties: {
              url: {
                type: 'keyword',
                index: false,
              },
            },
          },
          url: {
            type: 'keyword',
            index: false,
          },
        },
      },
      links: {
        type: 'object',
        properties: {
          wikipedia: {
            type: 'object',
            properties: {
              note: {
                type: 'keyword',
              },
              url: {
                type: 'keyword',
              },
            },
          },
          website: {
            type: 'object',
            properties: {
              note: {
                type: 'keyword',
              },
              url: {
                type: 'keyword',
              },
            },
          },
        },
      },
      identifiers: {
        type: 'object',
        properties: {
          official_position: {
            type: 'object',
            properties: {
              identifier: {
                type: 'keyword',
              },
              value: {
                type: 'keyword',
              },
            },
          },
          official_position_order: {
            type: 'object',
            properties: {
              identifier: {
                type: 'keyword',
              },
              value: {
                type: 'keyword',
              },
            },
          },
        },
      },
      position: {
        type: 'keyword',
      },
      start_date: {
        type: 'date',
        format: 'yyyy-MM-dd',
      },
      end_date: {
        type: 'date',
        format: 'yyyy-MM-dd',
      },
      legislative_period: {
        type: 'keyword',
      },
    },
  },
};
