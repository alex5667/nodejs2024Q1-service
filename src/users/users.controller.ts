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
  InternalServerErrorException,
  HttpCode,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  // @UsePipes(
  //   new ValidationPipe({
  //     whitelist: true,
  //     forbidNonWhitelisted: true,
  //     enableDebugMessages: true,
  //   }),
  // )
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  // @UsePipes(
  //   new ValidationPipe({
  //     whitelist: true,
  //     forbidNonWhitelisted: true,
  //     enableDebugMessages: true,
  //   }),
  // )
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      const user = await this.usersService.update(id, updateUserDto);
      return user;
    } catch {
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.remove(id);
  }
}
