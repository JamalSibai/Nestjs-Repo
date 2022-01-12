import { seeder } from 'nestjs-seeder';
import { MongooseModule } from '@nestjs/mongoose';
// import { Fa, userSeederSchema } from './user/seeds/userSeed.schema';

import { Fake, FakeSchema } from './user/seeds/userSeed.schema';
import { FakesSeeder } from './user/seeds/user.seeder';

seeder({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nestjs-seeder-sample'),
    MongooseModule.forFeature([{ name: Fake.name, schema: FakeSchema }]),
  ],
}).run([FakesSeeder]);
