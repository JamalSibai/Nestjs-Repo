import { Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@ObjectType()
export class ReturnUpdatedUser {
  @Field()
  @ApiProperty({ type: String, description: 'example' })
  _id?: string;

  @Field()
  @ApiProperty({ type: String, description: 'example' })
  email?: string;

  @Field()
  @ApiProperty({ type: String, description: 'example' })
  password?: string;

  @ApiProperty({ type: Boolean, description: 'example' })
  @Field()
  is_admin?: boolean;
}
