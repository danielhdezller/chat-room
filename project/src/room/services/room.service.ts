import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from '../dtos/create-room.dto';
import { Room } from '../entities/room.entity';
import { DataSource } from 'typeorm';
import { UserService } from '@/user/services/user.service';

@Injectable()
export class RoomService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly userService: UserService,
  ) {}
  async createRoom(createRoom: CreateRoomDto) {
    const roomRepository = this.dataSource.getRepository(Room);
    const room = roomRepository.create({ name: createRoom.name });
    return roomRepository.save(room);
  }

  async addUserToRoom({
    userId,
    chatRoomId,
  }: {
    userId: number;
    chatRoomId: number;
  }) {
    const roomRepository = this.dataSource.getRepository(Room);
    const room = await roomRepository.findOne({
      where: { id: chatRoomId },
      relations: ['users'],
    });
    const user = await this.userService.getUserById(userId);
    room?.users.push(user);
    return roomRepository.save(room);
  }
}
