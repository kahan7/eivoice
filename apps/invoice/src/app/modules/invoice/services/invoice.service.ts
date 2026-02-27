import { Injectable } from '@nestjs/common';
import { InvoiceRepository } from '../repositories/invoice.repository';
import { incvoiceRequestsMapping } from '../mapper';
import { CreateInvoiceTcpRequest } from '@common/interfaces/tcp/invoice/invoice-request.interface';

@Injectable()
export class InvoiceService {
  constructor(private readonly invoiceRepository: InvoiceRepository) {}
  create(params: CreateInvoiceTcpRequest) {
    const input = incvoiceRequestsMapping(params);
    return this.invoiceRepository.create(input);
  }
}
