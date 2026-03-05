import { ApiProperty } from '@nestjs/swagger';

export class BaseEntityResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
