import {
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';
import { ChatService } from './chat.service';
import { SendMessageDto } from './dto/send-message.dto';
import { JoinRoomDto } from './dto/join-room.dto';

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {}

  async afterInit(server: Server) {
    try {
      const pubClient = createClient({ url: process.env.REDIS_URL });
      const subClient = pubClient.duplicate();

      await pubClient.connect();
      await subClient.connect();

      server.adapter(createAdapter(pubClient, subClient));
      console.log('[WebSocket] Redis adapter initialized');
    } catch (error) {
      console.error('[WebSocket] Redis adapter connection failed:', error);
    }
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('join_room')
  handleJoinRoom(
    @MessageBody() data: JoinRoomDto,
    @ConnectedSocket() client: Socket,
  ) {
    client.join(data.roomId);
    console.log(`User ${data.userId} joined room ${data.roomId}`);
  }

  @SubscribeMessage('send_message')
  async handleSendMessage(
    @MessageBody() data: SendMessageDto,
    @ConnectedSocket() client: Socket,
  ) {
    const message = await this.chatService.saveMessage(data);

    // emit to EVERYONE in the room, including sender
    this.server.to(data.roomId).emit('receive_message', message);

    console.log(`📨 Message emitted to room ${data.roomId}:`, message);
  }
}
