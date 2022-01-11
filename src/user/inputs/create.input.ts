import { Field, InputType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';

@InputType()
export class UserInput {
  @Field()
  email: string;
  @Field()
  password: string;
  @Field()
  is_admin: boolean;
}
