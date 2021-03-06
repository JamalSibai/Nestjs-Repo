import { Module } from '@nestjs/common';
import { UsersService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { UserController } from './controllers/auth-controller/user.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategy/jwt.strategy';
import { UsersResolver } from './user.resolver';
import { JwtModule } from '@nestjs/jwt';
import { AuthControllerController } from './controllers/auth-controller/auth-controller.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: 'hard!to-guess_secret',

      signOptions: {
        expiresIn: '24h',
      },
    }),
    PassportModule.register({
      secret: 'hard!to-guess_secret',
      signOptions: { expiresIn: '24h' },
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UsersService, UsersResolver, JwtStrategy],
  controllers: [UserController, AuthControllerController],
  exports: [JwtModule],
})
export class UserModule {}
