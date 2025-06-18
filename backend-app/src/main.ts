import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RedisIoAdapter } from './adapters/redis-io.adapter';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  app.enableCors();

  const adapter = new RedisIoAdapter(app);
  await adapter.connectToRedis();
  app.useWebSocketAdapter(adapter);

  // Only first instance in PM2 cluster binds to HTTP
  if (!process.env.NODE_APP_INSTANCE) {
    const port = process.env.PORT || 4500;
    await app.listen(port);
    logger.log(`🚀 App running on http://localhost:${port}`);
  }
}
bootstrap();
