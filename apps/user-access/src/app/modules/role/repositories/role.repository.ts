import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RoleModel, RoleModelName } from '@common/schemas/role.schema';

@Injectable()
export class RoleRepository {
  constructor(
    @InjectModel(RoleModelName)
    private readonly roleModel: Model<RoleModel>,
  ) {}

  async getAll(): Promise<RoleModel[]> {
    return this.roleModel.find().lean().exec();
  }

  async getById(id: string): Promise<RoleModel | null> {
    return this.roleModel.findById(id).lean().exec();
  }

  async getByName(name: string): Promise<RoleModel | null> {
    return this.roleModel.findOne({ name }).lean().exec();
  }
}
