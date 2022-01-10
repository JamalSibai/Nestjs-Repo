import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { ReturnUser } from './dto/create-user.dto';
import { UserInput } from './inputs/user.input';
// import { CreateCatDto } from './dto/create-cat.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>) {}

  async create(userInput: UserInput): Promise<ReturnUser> {
    const createdUser = new this.UserModel(userInput);

    return await createdUser.save();
  }

  async findAll(): Promise<ReturnUser[]> {
    return await this.UserModel.find().exec();
  }
}
