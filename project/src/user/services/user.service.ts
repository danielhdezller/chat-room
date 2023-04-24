import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly dataSource: DataSource) {}

  async getUserById(userId: number) {
    const userRepository = this.dataSource.getRepository(User);
    const user = await userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException(`Not found user with id: ${userId}.`);
    }
    return user;
  }

  async createUser(createUser: CreateUserDto) {
    const userRepository = this.dataSource.getRepository(User);
    const user = userRepository.create({ name: createUser.name });
    return userRepository.save(user);
  }
}
