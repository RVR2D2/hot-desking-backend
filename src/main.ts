import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config, setupSwagger } from './common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  if (config.env !== 'production') {
    setupSwagger(app);
  }

  await app.listen(config.port);
}
bootstrap();
