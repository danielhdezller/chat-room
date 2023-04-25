import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Message } from '../entities/message.entity';
import { MessageDto } from '../dtos/message.dto';

@Injectable()
export class MessageService {
  constructor(private readonly dataSource: DataSource) {}
  async sendMessage(messageDto: MessageDto, roomId: number): Promise<Message> {
    const messageRepository = this.dataSource.getRepository(Message);
    const message = messageRepository.create({
      message: messageDto.message,
      userId: messageDto.userId,
      roomId,
    });
    return messageRepository.save(message);
  }

  findLatestMessage(roomId: number): Promise<Message> {
    const messageRepository = this.dataSource.getRepository(Message);
    return messageRepository.findOne({
      where: { roomId },
      order: { createdAt: 'DESC' },
    });
  }

  findMessages(roomId: number): Promise<Message[]> {
    const messageRepository = this.dataSource.getRepository(Message);
    return messageRepository.find({
      where: { roomId },
      order: { createdAt: 'DESC' },
    });
  }
}
