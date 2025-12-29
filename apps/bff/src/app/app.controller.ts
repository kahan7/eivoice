import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ResponseDto } from '@common/interfaces/gateway/response.interface';
import { ClientProxy } from '@nestjs/microservices';
import { ProcessId } from '@common/decorators/precessId.decorator';
import { map } from 'rxjs';
@Controller('app')
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('TCP_INVOICE_SERVICE') private readonly invoiceClient: ClientProxy,
  ) {}

  @Get()
  getData() {
    const result = this.appService.getData();
    return new ResponseDto({ data: result });
  }

  @Get('invoice')
  async getInvoice(@ProcessId() processId: string) {
    return this.invoiceClient
      .send<string, { processId: string; data: { invoiceId: number; invoiceName: string } }>('get_invoice', {
        processId,
        data: { invoiceId: 1, invoiceName: 'Hoa don 1' },
      })
      .pipe(map((data) => new ResponseDto<string>({ data })));
  }
}
