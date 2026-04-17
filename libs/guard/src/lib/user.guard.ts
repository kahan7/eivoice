import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, Logger, Inject } from '@nestjs/common';
import { firstValueFrom, map, Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { MetaDataKeys } from '@common/constants/common.constant';
import { getAccessToken, setUserData } from '@common/utils/request.utils';
import { TCP_SERVICES } from '@common/configuration/tcp.config';
import { TcpClient } from '@common/interfaces/tcp/common/tcp-client.interface';
import { TCP_REQUEST_MESSAGES } from '@common/constants/enum/tcp-request-message.enum';
import { AuthorizeResponse } from '@common/interfaces/tcp/authorizer/authorizer.response.interface';
import { RequestWithMetadata } from '@common/interfaces/common/request.interface';

@Injectable()
export class UserGuard implements CanActivate {
  private readonly logger = new Logger(UserGuard.name);
  constructor(
    private readonly reflector: Reflector,
    @Inject(TCP_SERVICES.AUTHORIZER_SERVICE) private readonly authorizerClient: TcpClient,
  ) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const authOptions = this.reflector.get<{ secured: boolean }>(MetaDataKeys.SECURED, context.getHandler());

    const req = context.switchToHttp().getRequest();

    if (!authOptions?.secured) {
      return true;
    }

    return this.verifyTokenUser(req);
  }

  private async verifyTokenUser(req: RequestWithMetadata): Promise<boolean> {
    try {
      const token = getAccessToken(req);
      const processId = req[MetaDataKeys.PROCESS_ID];
      const result = await this.verifyUserToken(token, processId as string);
      if (!result?.valid) {
        throw new UnauthorizedException('Token is invalid');
      }
      setUserData(req, result);
      return true;
    } catch (error) {
      this.logger.error({ error });
      throw new UnauthorizedException('Token is invalid');
    }
  }

  private async verifyUserToken(token: string, processId: string) {
    return firstValueFrom(
      this.authorizerClient
        .send<AuthorizeResponse, string>(TCP_REQUEST_MESSAGES.AUTHORIZER.VERIFY_USER_TOKEN, {
          data: token,
          processId,
        })
        .pipe(map((data) => data.data)),
    );
  }
}
