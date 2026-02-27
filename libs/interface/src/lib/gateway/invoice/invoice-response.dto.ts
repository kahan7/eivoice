import { INVOICE_STATUS } from '@common/constants/enum/invoice.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BaseResponseDto } from '../common/base-response.dto';
class ClientRequestDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  address: string;
}

class ItemRequestDto {
  @ApiProperty()
  productId: string;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  unitPrice: number;

  @ApiProperty()
  vatRate: number;

  @ApiProperty()
  total: number;

  @ApiProperty()
  name: string;
}
export class InvoiceResponseDto extends BaseResponseDto {
  @ApiProperty({ type: ClientRequestDto })
  client: ClientRequestDto;

  @ApiProperty()
  totalAmount: number;

  @ApiProperty()
  vatAmount: number;

  @ApiProperty({ type: String, enum: INVOICE_STATUS })
  status: INVOICE_STATUS;

  @ApiProperty({ type: [ItemRequestDto] })
  items: ItemRequestDto[];

  @ApiPropertyOptional()
  supervisorId?: string;

  @ApiPropertyOptional()
  fileUrl?: string;
}
