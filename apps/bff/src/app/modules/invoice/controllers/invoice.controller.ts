import { Body, Controller, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateInvoiceRequestDto } from '@common/interfaces/gateway/invoice';
import { ResponseDto } from '@common/interfaces/gateway/response.interface';
import { TCP_SERVICES } from '@common/configuration/tcp.config';
import { Inject } from '@nestjs/common';
import { TcpClient } from '@common/interfaces/tcp/common/tcp-client.interface';
import { map } from 'rxjs';
import { ProcessId } from '@common/decorators/precessId.decorator';
import { TCP_REQUEST_MESSAGES } from '@common/constants/enum/tcp-request-message.enum';
import { InvoiceTcpResponse, CreateInvoiceTcpRequest } from '@common/interfaces/tcp/invoice';

@ApiTags('Invoice')
@Controller('invoice')
export class InvoiceController {
  constructor(@Inject(TCP_SERVICES.INVOICE_SERVICE) private readonly invoiceClient: TcpClient) {}
  @Post()
  @ApiOkResponse({ type: ResponseDto<CreateInvoiceRequestDto> })
  @ApiOperation({ summary: 'Create a new invoice' })
  create(@Body() body: CreateInvoiceRequestDto, @ProcessId() processId: string) {
    return this.invoiceClient
      .send<InvoiceTcpResponse, CreateInvoiceTcpRequest>(TCP_REQUEST_MESSAGES.INVOICE.CREATE, {
        data: body,
        processId,
      })
      .pipe(map((data) => new ResponseDto(data)));
  }
}
