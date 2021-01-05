import { Body, Controller, Get } from '@nestjs/common';

import { LoginDto } from './dto/login.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller()
export class AppController {
  @Get()
  @ApiOperation({ summary: 'Hello World!' })
  public base(@Body() payload: LoginDto): string {
    return 'Hello World!';
  }
}
