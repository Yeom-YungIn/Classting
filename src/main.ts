import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger} from "./common/document/swagger";
import * as config from 'config';


const port = config.get('server').port
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn']
  });
  setupSwagger(app);
  await app.listen(3000);
  console.info(`Nest Application Start http://localhost:${port}`);
  console.info(`Swagger at http://localhost:${port}/api-docs`);

}
bootstrap();
