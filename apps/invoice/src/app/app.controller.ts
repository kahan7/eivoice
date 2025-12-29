import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { ProcessId } from '@common/decorators/precessId.decorator';
import { ProcessParam } from '@common/decorators/request-param.decorator';
import { ResponseDto } from '@common/interfaces/gateway/response.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @MessagePattern('get_invoice')
  getInvoice(
    @ProcessId() processId: string,
    @ProcessParam() param: { invoiceId: number; invoiceName: string },
  ): ResponseDto<string> {
    return new ResponseDto<string>({
      data: `Invoice: ${param.invoiceId}`,
      processID: processId,
    });
  }
}
