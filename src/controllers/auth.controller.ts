import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthGrantDto } from './dto/auth-grant.dto';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('/token')
  public async getToken(@Body() grantDto: AuthGrantDto) {
    const user = await this.userService.getUserByEmail(grantDto.username);

    if (!user || !(await user.isPasswordValid(grantDto.password))) {
      throw new UnauthorizedException('Unauthorized Access');
    }

    return {
      access_token: await this.authService.createAccessToken(user),
      token_type: 'Bearer',
      expires_in: 3600,
    };
  }
}
