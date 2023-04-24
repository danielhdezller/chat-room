import { Module } from '@nestjs/common';
import { RoomService } from './services/room.service';
import { RoomController } from './controllers/room.controller';
import { UserModule } from '@/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [RoomController],
  providers: [RoomService],
  exports: [RoomService],
})
export class RoomModule {}
