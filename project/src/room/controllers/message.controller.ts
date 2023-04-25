import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MessageDto } from '../dtos/message.dto';
import { MessageService } from '../services/message.service';
import { Message } from '../entities/message.entity';

@Controller('rooms')
@ApiTags('Messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post('/:roomId/messages')
  @ApiResponse({ type: Message })
  @ApiOperation({
    summary: 'sendMessage',
    description: 'Create a new message related to a user and a room.',
  })
  async sendMessage(
    @Param('roomId', ParseIntPipe) roomId: number,
    @Body() message: MessageDto,
  ): Promise<Message> {
    return this.messageService.sendMessage(message, roomId);
  }

  @Get('/:roomId/messages/latest')
  @ApiResponse({ type: Message })
  @ApiOperation({
    summary: 'findLatestMessage',
    description: 'Find the last message that was sent in a room.',
  })
  findLatestMessage(
    @Param('roomId', ParseIntPipe) roomId: number,
  ): Promise<Message> {
    return this.messageService.findLatestMessage(roomId);
  }

  @Get('/:roomId/messages')
  @ApiResponse({ type: [Message] })
  @ApiOperation({
    summary: 'findMessages',
    description:
      'Find all the messages sent to a room, sorted from newest to oldest.',
  })
  findMessages(
    @Param('roomId', ParseIntPipe) roomId: number,
  ): Promise<Message[]> {
    return this.messageService.findMessages(roomId);
  }
}
