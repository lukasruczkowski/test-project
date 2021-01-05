import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards, UsePipes } from '@nestjs/common';
import * as uuid from 'uuid';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { UserService } from '../services/user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '../entities/user';
import { AuthGuard } from '../common/guards/auth.guard';
import { JoiValidationPipe } from '../common/pipes/joi-validation.pipe';
import { createUserSchema } from './schemas/create-user.schema';
import { IsUuidPipe } from '../common/pipes/is-uuid.pipe';
import { UpdateUserDto } from './dto/update-user.dto';
import { updateUserSchema } from './schemas/update-user.schema';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 201, type: User })
  @UseGuards(new AuthGuard())
  @UsePipes(new JoiValidationPipe(createUserSchema))
  public async create(@Body() createUser: CreateUserDto): Promise<User> {
    const user = new User({
      ...createUser,
      id: uuid.v4(),
    });

    const newUser = await this.userService.createUser(user);

    return newUser.toResponseObject();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user' })
  @ApiResponse({ type: User })
  @UseGuards(new AuthGuard())
  public async findOne(@Param('id', new IsUuidPipe()) id: string): Promise<User> {
    const user = await this.userService.getUserById(id);
    return user.toResponseObject();
  }

  @Get()
  @ApiOperation({ summary: 'Get list of users' })
  @ApiResponse({ type: User, isArray: true })
  @UseGuards(new AuthGuard())
  public async findAll(): Promise<User[]> {
    const users = await this.userService.getAllUsers();
    return users.map(u => u.toResponseObject());
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Remove user' })
  @ApiResponse({ status: 204 })
  @UseGuards(new AuthGuard())
  public async deleteOne(@Param('id', new IsUuidPipe()) id: string): Promise<void> {
    return this.userService.deleteUser(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({ type: User })
  @UseGuards(new AuthGuard())
  @UsePipes(new JoiValidationPipe(updateUserSchema))
  public async updateOne(
    @Param('id', new IsUuidPipe()) id: string,
    @Body() updateUser: UpdateUserDto,
  ): Promise<User> {
    const user = await this.userService.updateUser(id, updateUser);
    return user.toResponseObject();
  }
}
