import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ReturnUser {
  @Field()
  _id: string;
  @Field()
  email: string;
  @Field()
  password: string;
  @Field()
  is_admin: boolean;
}
