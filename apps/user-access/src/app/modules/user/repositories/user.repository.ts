import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserModel, UserModelName } from '@common/schemas/user.schema';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(UserModelName)
    private readonly userModel: UserModel,
  ) {}

  create(data: Partial<User>) {
    return this.userModel.create(data);
  }

  getById(id: string) {
    return this.userModel.findById(id).lean<User>().exec();
  }

  getByUserId(userId: string) {
    return this.userModel.findOne({ userId }).populate('roles').lean<User>().exec();
  }

  getByEmail(email: string) {
    return this.userModel.findOne({ email }).lean<User>().exec();
  }

  async exists(email: string) {
    const result = await this.userModel.exists({ email }).exec();
    return !!result;
  }
}
