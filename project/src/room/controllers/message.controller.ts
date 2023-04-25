import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { MessageDto } from '../dtos/message.dto';
import { MessageService } from '../services/message.service';
import { Message } from '../entities/message.entity';

@Controller('rooms')
@ApiTags('Messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post('/:roomId/messages')
  @ApiResponse({ type: Message })
  async sendMessage(
    @Param('roomId', ParseIntPipe) roomId: number,
    @Body() message: MessageDto,
  ) {
    return this.messageService.sendMessage(message, roomId);
  }

  @Get('/:roomId/messages/latest')
  @ApiResponse({ type: Message })
  findLatestMessage(@Param('roomId', ParseIntPipe) roomId: number) {
    return this.messageService.findLatestMessage(roomId);
  }

  @Get('/:roomId/messages')
  @ApiResponse({ type: Message })
  findMessages(@Param('roomId', ParseIntPipe) roomId: number) {
    return this.messageService.findMessages(roomId);
  }
}
