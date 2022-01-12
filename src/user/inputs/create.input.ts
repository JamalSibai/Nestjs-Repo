import { Field, InputType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class UserInput {
  @ApiProperty({ type: String, description: 'example' })
  @Field()
  email: string;
  @ApiProperty({ type: String, description: 'example' })
  @Field()
  password: string;
  @ApiProperty({ type: Boolean, description: 'example' })
  @Field()
  is_admin: boolean;
}
