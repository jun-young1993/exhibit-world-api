import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from "@nestjs/config";
import { AllConfigType } from "./config/config.type";
import { VersioningType } from "@nestjs/common";
import { json, urlencoded } from "express";


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService<AllConfigType>);

  app.use(json({limit: '50mb'}));
  app.use(urlencoded({ extended: true, limit: '50mb' }));

  app.setGlobalPrefix(
    configService.getOrThrow('app.apiPrefix', { infer: true }),
    {
      exclude: ['/'],
    },
  );
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  }); // CORS 활성화
  const options = new DocumentBuilder()
    // .addSecurity('basic', {
    //   type: 'http',
    //   scheme: 'basic',
    // })
    .setTitle('API')
    .setDescription('API docs')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);
  await app.listen(configService.getOrThrow('app.port', { infer: true }));
}
bootstrap();
