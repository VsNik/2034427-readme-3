import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsString} from "class-validator";

export class RefreshTokenDto {
  @ApiProperty({
    description: 'Refresh token',
    example: 'refresh-token'
  })
  @IsString()
  @IsNotEmpty()
  public refreshToken: string;
}
