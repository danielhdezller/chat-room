import { Module } from '@nestjs/common';
import { RoomService } from './services/room.service';

@Module({
  imports: [],
  controllers: [],
  providers: [RoomService],
  exports: [RoomService],
})
export class RoomModule {}
