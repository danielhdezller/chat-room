import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from '../dtos/create-room.dto';
import { Room } from '../entities/room.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class RoomService {
  constructor(private readonly dataSource: DataSource) {}
  async createRoom(createRoom: CreateRoomDto) {
    const roomRepository = this.dataSource.getRepository(Room);
    const room = roomRepository.create({ name: createRoom.name });
    return roomRepository.save(room);
  }
}
