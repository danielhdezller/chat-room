import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateRoomDto } from '../dtos/create-room.dto';
import { RoomService } from '../services/room.service';
import { Room } from '../entities/room.entity';

@Controller('rooms')
@ApiTags('Rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}
  @Post()
  @ApiResponse({type: Room})
  async createRoom(@Body() createRoom: CreateRoomDto) {
    return this.roomService.createRoom(createRoom);
  }
}
