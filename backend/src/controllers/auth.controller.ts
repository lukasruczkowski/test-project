import { Body, Controller, HttpCode, Post, UnauthorizedException, UsePipes } from '@nestjs/common';
import * as uuid from 'uuid';

import { LoginDto } from './dto/login.dto';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { JoiValidationPipe } from '../common/pipes/joi-validation.pipe';
import { loginSchema } from './schemas/login.schema';
import { createUserSchema } from './schemas/create-user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '../entities/user';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginResponseDto } from './dto/login-response.dto';

@ApiTags('auth')
@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('/login')
  @HttpCode(200)
  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: 200, type: LoginResponseDto })
  @UsePipes(new JoiValidationPipe(loginSchema))
  public async login(@Body() payload: LoginDto): Promise<LoginResponseDto> {
    let user: User;
    try {
      user = await this.userService.getUserByEmail(payload.email);
    } catch (e) {
      throw new UnauthorizedException();
    }

    if (!user || !(await user.isPasswordValid(payload.password))) {
      throw new UnauthorizedException('Unauthorized Access');
    }

    return new LoginResponseDto({
      accessToken: await this.authService.createAccessToken(user),
      tokenType: 'Bearer',
      expiresIn: 3600,
    });
  }

  @Post('/signUp')
  @ApiOperation({ summary: 'Sign up the user' })
  @ApiResponse({ type: User })
  @UsePipes(new JoiValidationPipe(createUserSchema))
  public async signUp(@Body() createUserDto: CreateUserDto): Promise<User> {
    const user = new User({
      ...createUserDto,
      id: uuid.v4(),
    });

    const newUser = await this.userService.createUser(user);

    return newUser.toResponseObject();
  }
}
