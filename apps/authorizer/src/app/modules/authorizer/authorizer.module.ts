import { Module } from '@nestjs/common';
import { KeycloakModule } from '../keycloak/keycloak.module';
import { AuthorizerService } from './services/authorizer.service';
import { AuthorizerController } from './controllers/authorizer.controller';

@Module({
  imports: [KeycloakModule],
  controllers: [AuthorizerController],
  providers: [AuthorizerService],
  exports: [],
})
export class AuthorizerModule {}
