import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

type Options = {
  app: INestApplication;
  title: string;
  description: string;
  version: string;
  docsPath: string;
  modules: (new (...args: any[]) => any)[];
};

export function documentBuilderFactory({
  app,
  title,
  description,
  version,
  docsPath,
  modules,
}: Options) {
  const config = new DocumentBuilder()
    .setTitle(title)
    .setDescription(description)
    .setVersion(version)
    .addBearerAuth()
    .addGlobalResponse({
      status: 500,
      description: 'Internal Server Error',
    })
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    include: modules,
  });
  SwaggerModule.setup(docsPath, app, document, {
    swaggerOptions: { defaultModelsExpandDepth: -1 },
    customSiteTitle: title,
  });

  return {
    docsPath,
    title,
    description,
    version,
  };
}
