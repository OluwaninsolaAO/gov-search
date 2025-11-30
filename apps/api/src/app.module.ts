import { Module } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/exception.filter';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { SentryModule } from '@sentry/nestjs/setup';
import { SearchModule } from './search/search.module';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers: [
        {
          name: 'short',
          ttl: 1000,
          limit: 10,
        },
        {
          name: 'medium',
          ttl: 10000,
          limit: 40,
        },
        {
          name: 'long',
          ttl: 60000,
          limit: 200,
        },
      ],
    }),
    SentryModule.forRoot(),
    SearchModule,
  ],
  controllers: [],
  providers: [
    HttpExceptionFilter,
    { provide: APP_GUARD, useClass: ThrottlerGuard },
  ],
})
export class AppModule {}
