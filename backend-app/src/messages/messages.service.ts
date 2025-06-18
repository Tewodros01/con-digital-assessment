import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MessagesService {
  constructor(private prisma: PrismaService) {}

  async getMessagesForRoom(roomId: string) {
    return this.prisma.message.findMany({
      where: { roomId },
      include: {
        sender: { select: { id: true, username: true } },
      },
      orderBy: { createdAt: 'asc' },
    });
  }
}
