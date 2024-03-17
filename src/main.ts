import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {SwaggerModule} from "@nestjs/swagger";
import {BaseAPIDocument} from "./common/document/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new BaseAPIDocument().initializeOptions();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, document);
  await app.listen(3000);
}
bootstrap();
