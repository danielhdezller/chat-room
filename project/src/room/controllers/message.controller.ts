import { Body, Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { MessageDto } from '../dtos/message.dto';
import { MessageService } from '../services/message.service';
import { Message } from '../entities/message.entity';

@Controller('messages')
@ApiTags('Messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post('rooms/:roomId')
  @ApiResponse({ type: Message })
  async sendMessage(
    @Param('roomId', ParseIntPipe) roomId: number,
    @Body() message: MessageDto,
  ) {
    return this.messageService.sendMessage(message, roomId);
  }
}
