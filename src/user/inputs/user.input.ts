import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserInput {
  @Field()
  email: string;
  @Field()
  password: string;
  @Field()
  is_admin: boolean;
}
