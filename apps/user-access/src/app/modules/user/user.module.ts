import { Module } from '@nestjs/common';
import { UserDestination } from '@common/schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './controllers/user.controller';
import { UserRepository } from './repositories/user.repository';
import { UserService } from './services/user.service';

@Module({
  imports: [MongooseModule.forFeature([UserDestination])],
  controllers: [UserController],
  providers: [UserRepository, UserService],
})
export class UserModule {}
