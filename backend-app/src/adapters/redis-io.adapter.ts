import { IoAdapter } from '@nestjs/platform-socket.io';
import { INestApplicationContext } from '@nestjs/common';
import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';
import { ServerOptions } from 'socket.io';
import { Server as SocketIOServer } from 'socket.io';

export class RedisIoAdapter extends IoAdapter {
  private adapterConstructor: ReturnType<typeof createAdapter>;

  constructor(private app: INestApplicationContext) {
    super(app);
  }

  async connectToRedis(): Promise<void> {
    const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
  
    const pubClient = createClient({ url: redisUrl });
    const subClient = pubClient.duplicate();
  
    await pubClient.connect();
    await subClient.connect();
  
    this.adapterConstructor = createAdapter(pubClient, subClient);
    console.log('[RedisIoAdapter] Redis adapter connected to:', redisUrl);
  }  

  // return a raw Socket.IO server instance
  createIOServer(
    port: number,
    options?: Partial<ServerOptions>,
  ): SocketIOServer {
    const server = super.createIOServer(0, options) as SocketIOServer;

    if (this.adapterConstructor) {
      server.adapter(this.adapterConstructor);
    } else {
      console.warn('[RedisIoAdapter] Adapter constructor not initialized!');
    }

    return server;
  }
}
