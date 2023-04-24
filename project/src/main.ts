import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfiguration } from './config-provider/configurations/app.configuration';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Extract the configProvider and the logger from the created app

  const appConfiguration = app.select(AppModule).get(AppConfiguration);
  await app.listen(appConfiguration.appPort);
}
bootstrap();
