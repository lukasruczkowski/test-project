import { Body, Controller, Post, UnauthorizedException, UsePipes } from '@nestjs/common';
import { AuthGrantDto } from './dto/auth-grant.dto';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { PayloadValidationPipe } from '../common/pipes/payload-validation.pipe';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('/token')
  @UsePipes(new PayloadValidationPipe())
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
