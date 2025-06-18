import { Controller, Get, Param } from '@nestjs/common';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get('room/:roomId')
  getMessagesByRoom(@Param('roomId') roomId: string) {
    return this.messagesService.getMessagesForRoom(roomId);
  }
}
