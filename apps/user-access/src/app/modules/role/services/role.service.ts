import { Injectable, NotFoundException } from '@nestjs/common';
import { RoleRepository } from '../repositories/role.repository';
import { RoleModel } from '@common/schemas/role.schema';

@Injectable()
export class RoleService {
  constructor(private readonly roleRepository: RoleRepository) {}

  async getAll(): Promise<RoleModel[]> {
    return await this.roleRepository.getAll();
  }

  async getByName(name: string): Promise<RoleModel | null> {
    return await this.roleRepository.getByName(name);
  }

  async getById(id: string): Promise<RoleModel> {
    const role = await this.roleRepository.getById(id);
    if (!role) {
      throw new NotFoundException(`Role với ID "${id}" không tồn tại`);
    }
    return role;
  }
}
