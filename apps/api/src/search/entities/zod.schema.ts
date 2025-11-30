import { z } from 'zod/v4';

export const QueryAISchema = z.object({
  answer: z.string(),
  sources: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      position: z.string(),
      relevance: z.number().min(0).max(1),
    }),
  ),
  suggestions: z.array(z.string()),
});

export type QueryAISchema = z.infer<typeof QueryAISchema>;
