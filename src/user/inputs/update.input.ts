import { Field, InputType } from '@nestjs/graphql';

import { IsOptional, IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateUserInput {
  @Field()
  @IsOptional()
  @IsNotEmpty()
  is_admin?: boolean;

  @Field()
  @IsOptional()
  @IsNotEmpty()
  image?: string;
}
