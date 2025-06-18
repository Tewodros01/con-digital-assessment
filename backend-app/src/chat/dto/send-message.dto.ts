import { IsUUID, IsString } from 'class-validator';

export class SendMessageDto {
  @IsUUID()
  senderId: string;

  @IsUUID()
  roomId: string;

  @IsString()
  content: string;
}
