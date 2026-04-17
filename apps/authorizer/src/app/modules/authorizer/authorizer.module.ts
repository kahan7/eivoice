import { Module } from '@nestjs/common';
import { KeycloakModule } from '../keycloak/keycloak.module';
import { AuthorizerService } from './services/authorizer.service';
import { AuthorizerController } from './controllers/authorizer.controller';
import { TCP_SERVICES, TcpProvider } from '@common/configuration/tcp.config';
import { ClientsModule } from '@nestjs/microservices';

@Module({
  imports: [KeycloakModule, ClientsModule.registerAsync([TcpProvider(TCP_SERVICES.USER_ACCESS_SERVICE)])],
  controllers: [AuthorizerController],
  providers: [AuthorizerService],
  exports: [],
})
export class AuthorizerModule {}
