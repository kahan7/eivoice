import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiProperty({ example: 'access-token-example' })
  accessToken: string;

  @ApiProperty({ example: 'refresh-token-example' })
  refreshToken: string;
}
