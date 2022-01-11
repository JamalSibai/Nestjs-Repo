import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { CurrentUser } from './decorators/user.decorator';
import { ReturnUser } from './dto/create-user.dto';
import { UserAuthGuard } from './guards/auth-guard.guard';
import { UserInput } from './inputs/create.input';
import { UpdateUserInput } from './inputs/update.input';

import { UsersService } from './user.service';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => String)
  @UseGuards(UserAuthGuard)
  async Hello(@CurrentUser() user: { _id: string; email: string }) {
    return 'hello';
  }

  @Query(() => [ReturnUser])
  @UseGuards(UserAuthGuard)
  async findAllUsers(): Promise<ReturnUser[]> {
    try {
      return this.usersService.findAll();
    } catch (err) {
      console.error(err);
    }
  }

  @Query(() => [ReturnUser])
  async Users(): Promise<ReturnUser[]> {
    return await this.usersService.findAll();
  }

  @Query(() => [ReturnUser])
  @Mutation(() => ReturnUser)
  async createUser(@Args('input') input: UserInput) {
    return await this.usersService.createUser(input);
  }

  @Mutation(() => String)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    try {
      return await this.usersService.login({ email, password });
    } catch (err) {
      console.error(err);
    }
  }

  @Mutation(() => ReturnUser)
  @UseGuards(UserAuthGuard)
  async UpdateUser(
    @CurrentUser() user: { _id: string; email: string },
    @Args('updateUser') updateUserInput: UpdateUserInput,
  ) {
    try {
      return await this.usersService.updateUser(user._id, updateUserInput);
    } catch (err) {
      console.error(err);
    }
  }

  @Mutation(() => ReturnUser)
  @UseGuards(UserAuthGuard)
  async UpdateUserPass(
    @CurrentUser() user: { _id: string; email: string },
    @Args('currPass') currPass: string,
    @Args('newPass') newPass: string,
  ) {
    try {
      return await this.usersService.updatePassword(
        user._id,
        currPass,
        newPass,
      );
    } catch (err) {
      console.error(err);
    }
  }

  @Query(() => ReturnUser)
  @UseGuards(UserAuthGuard)
  async findOne(@Args('_id', { type: () => String }) _id: Types.ObjectId) {
    return await this.usersService.findOne(_id);
  }

  @UseGuards(UserAuthGuard)
  @Mutation(() => ReturnUser)
  async removeUser(@Args('_id') _id: string) {
    try {
      return await this.usersService.remove(_id);
    } catch (err) {
      console.error(err);
    }
  }

  @Query(() => ReturnUser)
  @UseGuards(UserAuthGuard)
  async CurrentUser(
    @CurrentUser() user: { _id: Types.ObjectId; email: string },
  ) {
    try {
      return await this.usersService.findOne(user._id);
    } catch (err) {
      console.error(err);
    }
  }
}
