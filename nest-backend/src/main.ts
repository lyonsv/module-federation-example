import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:3000', 'http://sitea.localhost:3000', 'http://siteb.localhost:3000'],
    methods: ['GET', 'POST'],
    credentials: true,
  });
  await app.listen(3001);
}
bootstrap(); 