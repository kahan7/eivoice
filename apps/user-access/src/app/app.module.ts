import { Module } from '@nestjs/common';
import { CONFIGURATION, TConfiguration } from '../configuration';
import { ConfigModule } from '@nestjs/config';
import { RoleModule } from './modules/role/role.module';
@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, load: [() => CONFIGURATION] }), RoleModule],
})
export class AppModule {
  static CONFIGURATION: TConfiguration = CONFIGURATION;
}
