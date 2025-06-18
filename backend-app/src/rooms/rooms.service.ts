import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RoomsService {
  constructor(private prisma: PrismaService) {}

  async getOrCreatePrivateRoom(userAId: string, userBId: string) {
    // find an existing private room with exactly these 2 participants
    const existingRoom = await this.prisma.room.findFirst({
      where: {
        isGroup: false,
        participants: {
          every: {
            userId: {
              in: [userAId, userBId],
            },
          },
        },
      },
      include: { participants: true },
    });

    if (existingRoom && existingRoom.participants.length === 2) {
      return existingRoom;
    }

    // Create new room if it doesn't exist
    const newRoom = await this.prisma.room.create({
      data: {
        isGroup: false,
        participants: {
          create: [{ userId: userAId }, { userId: userBId }],
        },
      },
      include: { participants: true },
    });

    return newRoom;
  }
}
