import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  // UsePipes,
  // ValidationPipe,
  ParseUUIDPipe,
  // InternalServerErrorException,
  HttpCode,
  InternalServerErrorException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);

    return new User(user);
  }

  @Get()
  async findAll() {
    const users = await this.usersService.findAll();
    const correctUsers = users.map((user) => new User(user));
    return correctUsers;
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new InternalServerErrorException('Something went wrong');
    }
    return new User(user);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const user = await this.usersService.update(updateUserDto, id);
    if (!user) {
      throw new InternalServerErrorException('Something went wrong');
    }
    return new User(user);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.remove(id);
  }
}
