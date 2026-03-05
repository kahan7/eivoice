import { MongoProvider } from '@common/configuration/mongo.config';
import { Module } from '@nestjs/common';
import { RoleDestination } from '@common/schemas/role.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleRepository } from './repositories/role.repository';
import { RoleService } from './services/role.service';

@Module({
  imports: [MongoProvider, MongooseModule.forFeature([RoleDestination])],
  controllers: [],
  providers: [RoleService, RoleRepository],
})
export class RoleModule {}
