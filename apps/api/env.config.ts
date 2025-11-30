import { z } from 'zod/v4';
import { config } from 'dotenv';

config({ path: '.env' });

const NodeEnv = z
  .enum(['development', 'production', 'test'])
  .default('development');

export const envSchema = z.object({
  // App Setup and Configurations
  NODE_ENV: NodeEnv,
  PORT: z.coerce.number().default(5000),

  LOGGER_COLORS: z.stringbool().default(true),
  LOGGER_JSON: z.stringbool().default(false),

  API_DOCS_PATH: z.string().default('v1/docs'),

  // Project Details
  PROJECT_NAME: z.string().default('nestapp'),
  PROJECT_TITLE: z.string().default('Nest App'),
  PROJECT_DESCRIPTION: z.string().default(''),
  PROJECT_VERSION: z.string().default('1.0.0'),

  // Sentry Configs
  SENTRY_DSN: z.string().default(''),

  // Elasticsearch Configs
  ELASTICSEARCH_NODES: z.string().transform((val) => val.split(',')),
  ELASTICSEARCH_CLOUD_ID: z.string(),
  ELASTICSEARCH_API_KEY: z.string(),

  DEFAULT_PAGE_SIZE: z.coerce.number().default(20),

  OPENAI_API_KEY: z.string(),
});

export type Env = z.infer<typeof envSchema>;
export type NodeEnv = z.infer<typeof NodeEnv>;
export const env = envSchema.parse(process.env);
