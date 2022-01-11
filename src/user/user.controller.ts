import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiKeyGuard } from './guards/api-key.guard';
import { UserInput } from './inputs/create.input';
import { UsersService } from './user.service';

@Controller('user')
// @UseGuards(AuthGuard())
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseGuards(new ApiKeyGuard())
  async createUser(@Body() input: UserInput) {
    console.log(input);
    return await this.usersService.createUser(input);
  }
}
