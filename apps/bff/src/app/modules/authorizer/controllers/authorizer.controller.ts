import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { map } from 'rxjs/operators';

import { TCP_SERVICES } from '@common/configuration/tcp.config';
import { TcpClient } from '@common/interfaces/tcp/common/tcp-client.interface';

import { LoginTcpRequest, LoginTcpResponse } from '@common/interfaces/tcp/authorizer';
import { ProcessId } from '@common/decorators/precessId.decorator';
import { ResponseDto } from '@common/interfaces/gateway/response.interface';
import { LoginRequestDto, LoginResponseDto } from '@common/interfaces/gateway/authorizer';
import { TCP_REQUEST_MESSAGES } from '@common/constants/enum/tcp-request-message.enum';

@ApiTags('Authorizer')
@Controller('authorizer')
export class AuthorizerController {
  constructor(
    @Inject(TCP_SERVICES.AUTHORIZER_SERVICE)
    private readonly authorizerClient: TcpClient,
  ) {}

  @Post('login')
  @ApiOperation({ summary: 'Login with username and password' })
  @ApiOkResponse({
    type: ResponseDto<LoginResponseDto>,
  })
  login(@Body() body: LoginRequestDto, @ProcessId() processId: string) {
    return this.authorizerClient
      .send<LoginTcpResponse, LoginTcpRequest>(TCP_REQUEST_MESSAGES.AUTHORIZER.LOGIN, {
        data: body,
        processId,
      })
      .pipe(map((data) => new ResponseDto(data)));
  }
}
