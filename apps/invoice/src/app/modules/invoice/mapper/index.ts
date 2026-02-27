import { CreateInvoiceTcpRequest } from '@common/interfaces/tcp/invoice/invoice-request.interface';
import { Invoice } from '@common/schemas/invoice.schema';

export const incvoiceRequestsMapping = (data: CreateInvoiceTcpRequest): Partial<Invoice> => {
  return {
    ...data,
    totalAmount: data.items.reduce((total, item) => total + item.unitPrice * item.quantity * (item.vatRate / 100), 0),
  };
};
