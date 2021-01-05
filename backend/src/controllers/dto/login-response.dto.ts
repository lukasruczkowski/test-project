import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiProperty()
  readonly accessToken: string;

  @ApiProperty()
  readonly tokenType: string;

  @ApiProperty()
  readonly expiresIn: number;

  constructor(obj: { accessToken: string; tokenType: string; expiresIn: number }) {
    this.accessToken = obj.accessToken;
    this.tokenType = obj.tokenType;
    this.expiresIn = obj.expiresIn;
  }
}
