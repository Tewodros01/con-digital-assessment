import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SendMessageDto } from './dto/send-message.dto';

@Injectable()
export class ChatService {
  constructor(private readonly prisma: PrismaService) {}

  async saveMessage(data: SendMessageDto) {
    const { content, senderId, roomId } = data;

    const saved = await this.prisma.message.create({
      data: {
        content,
        senderId,
        roomId,
      },
      include: {
        sender: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });

    console.log('Message saved and returned:', saved);
    return saved;
  }
}
