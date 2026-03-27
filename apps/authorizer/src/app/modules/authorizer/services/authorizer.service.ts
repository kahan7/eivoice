import { Injectable } from '@nestjs/common';

import { LoginTcpRequest } from '@common/interfaces/tcp/authorizer';
import { KeycloakHttpService } from '../../keycloak/services/keycloak-http.service';

@Injectable()
export class AuthorizerService {
  constructor(private readonly keycloakHttpService: KeycloakHttpService) {}

  async login(params: LoginTcpRequest) {
    const { username, password } = params;

    const response = await this.keycloakHttpService.exchangeUserToken({
      username,
      password,
    });

    const { access_token, refresh_token } = response;

    return {
      accessToken: access_token,
      refreshToken: refresh_token,
    };
  }
}
