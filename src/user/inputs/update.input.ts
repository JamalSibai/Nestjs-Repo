import { Field, InputType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';

@InputType()
export class UpdateUserInput {
  @Field()
  is_admin: boolean;
}
