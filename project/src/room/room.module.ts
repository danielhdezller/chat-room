import { Module } from '@nestjs/common';
import { RoomService } from './services/room.service';
import { RoomController } from './controllers/room.controller';
import { UserModule } from '@/user/user.module';
import { MessageController } from './controllers/message.controller';
import { MessageService } from './services/message.service';

@Module({
  imports: [UserModule],
  controllers: [RoomController, MessageController],
  providers: [RoomService, MessageService],
  exports: [RoomService, MessageService],
})
export class RoomModule {}
