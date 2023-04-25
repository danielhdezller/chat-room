import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dtos/create-user.dto';

@Controller('users')
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiResponse({ type: User })
  @ApiOperation({
    summary: 'createUser',
    description: 'Create a user.',
  })
  async createRoom(@Body() createUser: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUser);
  }
}
