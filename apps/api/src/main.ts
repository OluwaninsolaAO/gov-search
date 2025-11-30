import './instrumentation';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env, NodeEnv } from 'env.config';
import { HttpExceptionFilter } from 'src/common/filters/exception.filter';
import { ConsoleLogger, LogLevel, ValidationPipe } from '@nestjs/common';
import morgan from 'morgan';
import { documentBuilderFactory } from 'libs/swagger';
import { JsonSerializationInterceptor } from './common/interceptors/json-serializer.interceptor';

const LOG_LEVELS: Record<NodeEnv, LogLevel[]> = {
  production: ['log', 'warn', 'error'],
  development: ['log', 'warn', 'error', 'debug', 'verbose'],
  test: ['log', 'warn', 'error', 'debug', 'verbose', 'fatal'],
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger({
      colors: env.LOGGER_COLORS,
      json: env.LOGGER_JSON,
      logLevels: LOG_LEVELS[env.NODE_ENV],
    }),
    cors: true,
  });
  app.useGlobalFilters(app.get(HttpExceptionFilter));
  app.useGlobalInterceptors(new JsonSerializationInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  app.use(morgan('dev'));
  let docs: ReturnType<typeof documentBuilderFactory>[] = [];
  if (env.NODE_ENV !== 'production') {
    docs = [
      documentBuilderFactory({
        app,
        title: env.PROJECT_TITLE,
        description: env.PROJECT_DESCRIPTION,
        version: env.PROJECT_VERSION,
        docsPath: `${env.API_DOCS_PATH}`,
        modules: [],
      }),
    ];
  }
  await app.listen(env.PORT ?? 5000);
  console.info(`App running on http://localhost:${env.PORT ?? 5000}/`);
  docs.forEach((doc) => {
    console.info(
      `Docs available on http://localhost:${env.PORT ?? 5000}/${doc.docsPath}`,
    );
  });
}

bootstrap();
