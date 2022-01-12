import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Seeder, DataFactory } from 'nestjs-seeder';
import { Fake } from './userSeed.schema';

@Injectable()
export class FakesSeeder implements Seeder {
  constructor(@InjectModel(Fake.name) private readonly fake: Model<Fake>) {}

  async seed(): Promise<any> {
    // Generate 10 users.
    const users = DataFactory.createForClass(Fake).generate(10);

    // Insert into the database.
    return this.fake.insertMany(users);
  }

  async drop(): Promise<any> {
    return this.fake.deleteMany({});
  }
}
