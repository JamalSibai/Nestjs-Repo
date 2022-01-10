import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';

import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { join } from 'path/posix';

@Module({
  imports: [
    UserModule,
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    MongooseModule.forRoot('mongodb://localhost/graphql-project'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
