import { Controller, UseInterceptors } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { TcpLoggingInterceptor } from '@common/interceptors/tcpLogging.interceptor';
import { TCP_REQUEST_MESSAGES } from '@common/constants/enum/tcp-request-message.enum';
import { RequestParams } from '@common/decorators/request-param.decorator';
import { LoginTcpRequest, LoginTcpResponse } from '@common/interfaces/tcp/authorizer';
import { Response } from '@common/interfaces/tcp/common/response.interface';

import { AuthorizerService } from '../services/authorizer.service';

@Controller()
@UseInterceptors(TcpLoggingInterceptor)
export class AuthorizerController {
  constructor(private readonly authorizerService: AuthorizerService) {}

  @MessagePattern(TCP_REQUEST_MESSAGES.AUTHORIZER.LOGIN)
  async login(@RequestParams() params: LoginTcpRequest) {
    const data = await this.authorizerService.login(params);

    return Response.success<LoginTcpResponse>(data);
  }
}
