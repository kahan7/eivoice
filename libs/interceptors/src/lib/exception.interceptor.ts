import { HttpException, HttpStatus, NestInterceptor } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { ExecutionContext } from '@nestjs/common';
import { CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ResponseDto } from '@common/interfaces/gateway/response.interface';
import { MetaDataKeys } from '@common/constants/common.constant';
import { HTTP_MESSAGE } from '@common/constants/enum/http-message.enum';

export class ExceptionInterceptor implements NestInterceptor {
  private readonly logger = new Logger(ExceptionInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<
      Request & { [MetaDataKeys.PROCESS_ID]: string; [MetaDataKeys.START_TIME]: number }
    >();

    const processID = request[MetaDataKeys.PROCESS_ID];
    const startTime = request[MetaDataKeys.START_TIME];

    return next.handle().pipe(
      map((data: ResponseDto<unknown> | unknown) => {
        const durationMs = Date.now() - startTime;
        (data as ResponseDto<unknown>).processID = processID;
        (data as ResponseDto<unknown>).duration = `${durationMs} ms`;

        return data as ResponseDto<unknown>;
      }),
      catchError((error) => {
        this.logger.error(error);

        const durationMs = Date.now() - startTime;
        const message = error?.response?.message || error?.message || error || HTTP_MESSAGE.INTERNAL_SERVER_ERROR;
        const code =
          error?.code || error?.statusCode || error?.response?.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;

        throw new HttpException(
          new ResponseDto({ data: null, message, statusCode: code, duration: `${durationMs} ms`, processID }),
          code,
        );
      }),
    );
  }
}
