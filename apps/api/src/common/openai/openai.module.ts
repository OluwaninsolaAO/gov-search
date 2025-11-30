import { Logger, Module, Inject } from '@nestjs/common';
import { env } from 'env.config';
import { OPENAI_CLIENT } from './openai.constant';
import OpenAI from 'openai';

export const InjectOpenAI = Inject(OPENAI_CLIENT);
@Module({
  providers: [
    {
      provide: OPENAI_CLIENT,
      useFactory: () => {
        const logger = new Logger(OpenAIModule.name);
        logger.log('Initiating OpenAI client...');
        const client = new OpenAI({ apiKey: env.OPENAI_API_KEY });
        return client;
      },
    },
  ],
  exports: [OPENAI_CLIENT],
})
export class OpenAIModule {}
