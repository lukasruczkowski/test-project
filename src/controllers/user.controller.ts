import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes } from '@nestjs/common';
import * as uuid from 'uuid';

import { UserService } from '../services/user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '../entities/user';
import { AuthGuard } from '../common/guards/auth.guard';
import { PayloadValidationPipe } from '../common/pipes/payload-validation.pipe';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Post()
  @UsePipes(new PayloadValidationPipe())
  public async signUp(@Body() createUserDto: CreateUserDto) {
    const user = new User();
    user.id = uuid.v4();
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;

    const newUser = await this.userService.createUser(user);

    return newUser.toResponseObject();
  }

  @Get(':id')
  @UseGuards(new AuthGuard())
  public async findOne(@Param('id') id) {
    const user = await this.userService.getUserById(id);
    return user.toResponseObject();
  }

  @Get()
  @UseGuards(new AuthGuard())
  public async findAll() {
    const users = await this.userService.getAllUsers();
    return users.map(u => u.toResponseObject());
  }

  @Delete(':id')
  @UseGuards(new AuthGuard())
  public async deleteOne(@Param('id') id) {
    return this.userService.deleteUser(id);
  }

  @Put(':id')
  @UseGuards(new AuthGuard())
  // TODO: validate input
  public async updateOne(@Param('id') id, @Body() updateUserDto) {
    const user = await this.userService.updateUser(id, updateUserDto);
    return user.toResponseObject();
  }
}
