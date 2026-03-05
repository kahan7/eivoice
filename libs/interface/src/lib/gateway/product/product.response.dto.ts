import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BaseEntityResponseDto } from '../common/base-entity-response.dto';

export class ProductResponseDto extends BaseEntityResponseDto {
  @ApiProperty()
  name: string;

  @ApiPropertyOptional()
  description?: string;

  @ApiProperty()
  sku: string;

  @ApiProperty()
  unit: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  vatRate: number;
}
