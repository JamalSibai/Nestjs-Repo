import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ReturnUser } from './dto/create-user.dto';
import { UserInput } from './inputs/user.input';
import { UsersService } from './user.service';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => String)
  async Hello() {
    return 'hello';
  }

  @Query(() => [ReturnUser])
  async User(): Promise<ReturnUser[]> {
    return this.usersService.findAll();
  }

  @Mutation(() => ReturnUser)
  async createUser(@Args('input') input: UserInput) {
    return this.usersService.create(input);
  }
}
