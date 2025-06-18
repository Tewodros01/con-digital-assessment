import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RedisIoAdapter } from './adapters/redis-io.adapter';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  const adapter = new RedisIoAdapter(app);
  await adapter.connectToRedis();
  app.useWebSocketAdapter(adapter);

  const port = process.env.PORT || 4500;
  await app.listen(port);
  logger.log(`App running on http://localhost:${port}`);
}
bootstrap();
