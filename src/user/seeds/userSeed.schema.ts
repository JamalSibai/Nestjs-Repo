import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Factory } from 'nestjs-seeder';

@Schema()
export class Fake extends Document {
  @Factory((faker) => `${faker.name.findName()}@gmail.com`.replace(/\s/g, ''))
  @Prop()
  email: string;
  @Factory('password')
  @Prop()
  password: string;

  @Factory((faker) => faker.random.arrayElement([true, false]))
  @Prop()
  is_admin: boolean;

  @Factory((faker) => `${faker.name.findName()}profileImage`.replace(/\s/g, ''))
  @Prop()
  image: string;
}

export const FakeSchema = SchemaFactory.createForClass(Fake);
