import { Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';

import { UserInput } from './inputs/create.input';
import { GraphQLError } from 'graphql';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UpdateUserInput } from './inputs/update.input';

@Injectable()
export class UsersService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(User.name) private UserModel: Model<UserDocument>,
  ) {}

  async createUser(userInput: UserInput) {
    try {
      console.log('userInput', userInput);
      const isUser = await this.UserModel.findOne({
        email: userInput.email,
      });
      if (isUser) {
        throw new GraphQLError('Nah bro you already exist');
      } else {
        userInput.password = await bcrypt
          .hash(userInput.password, 10)
          .then((r) => r);
        return await new this.UserModel(userInput).save();
      }
    } catch (err) {
      console.error(err);
    }
  }

  async login({ password, email }) {
    try {
      const user = await this.UserModel.findOne({ email });
      console.log('in service', user.is_admin);
      return user && (await bcrypt.compare(password, user.password))
        ? await this.jwtService.signAsync({
            email,
            _id: user._id,
            is_admin: user.is_admin,
          })
        : new GraphQLError('Nah homie, wrong password/email');
    } catch (err) {
      console.error(err);
    }
  }

  async findAll() {
    try {
      return await this.UserModel.find().exec();
    } catch (err) {
      console.error(err);
    }
  }

  async updateUser(_id, updateUserInput: UpdateUserInput) {
    try {
      return await this.UserModel.findByIdAndUpdate(_id, updateUserInput, {
        new: true,
      }).exec();
    } catch (err) {
      console.error(err);
    }
  }

  async updatePassword(_id, currPass, newPass) {
    try {
      const User = await this.UserModel.findById(_id);
      if (await bcrypt.compare(currPass, User.password)) {
        User.password = await bcrypt.hash(newPass, 10);
        return await new this.UserModel(User).save();
      }
    } catch (err) {
      console.error(err);
    }
  }

  async findOne(_id: Types.ObjectId) {
    try {
      return await this.UserModel.findById(_id);
    } catch (err) {
      console.error(err);
    }
  }

  async remove(_id: string) {
    try {
      return await this.UserModel.findByIdAndRemove(_id);
    } catch (err) {
      console.error(err);
    }
  }
}
