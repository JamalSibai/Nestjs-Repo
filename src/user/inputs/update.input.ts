import { Field, InputType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
import { IsOptional, IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateUserInput {
  @IsOptional()
  @Field()
  is_admin?: boolean;
  // @IsOptional()
  // @Field()
  // image?: string;
}
