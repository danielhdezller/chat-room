import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dtos/create-user.dto';

@Controller('users')
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiResponse({ type: User })
  async createRoom(@Body() createUser: CreateUserDto) {
    return this.userService.createUser(createUser);
  }
}
