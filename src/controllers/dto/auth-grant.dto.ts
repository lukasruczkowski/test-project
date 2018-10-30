import { IsString } from 'class-validator';

export class AuthGrantDto {
  @IsString()
  readonly username: string;

  @IsString()
  readonly password: string;
}
