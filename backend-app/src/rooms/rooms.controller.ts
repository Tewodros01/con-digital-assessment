import { Controller, Post, Body } from '@nestjs/common';
import { RoomsService } from './rooms.service';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post('private')
  async getOrCreateRoom(@Body() body: { userAId: string; userBId: string }) {
    return this.roomsService.getOrCreatePrivateRoom(body.userAId, body.userBId);
  }
}
