import { PickType } from '@nestjs/swagger';
import { Message } from '../entities/message.entity';

export class MessageDto extends PickType(Message, ['message', 'userId']) {}
