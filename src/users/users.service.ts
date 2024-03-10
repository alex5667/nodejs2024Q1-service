import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DbService } from 'src/db/db.service';
import { User } from './entities/user.entity';

// export interface REturnUser {
//   id: string;
//   login: string;
//   password?: string;
//   version: number;
//   createdAt: number;
//   updatedAt: number;
// }

@Injectable()
export class UsersService {
  constructor(private db: DbService) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.db.createUser(createUserDto);

    return this.removePassword(user);
  }

  async findAll() {
    const users = this.db.getUsers().map((user) => this.removePassword(user));
    return users;
  }

  async findOne(id: string) {
    const user = this.db.getUserById(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} doesn't exist`);
    }

    return this.removePassword(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const existingUser = this.db.getUserById(id);
    if (!existingUser) {
      throw new NotFoundException(`User with id ${id} doesn't exist`);
    }

    if (existingUser.password !== updateUserDto.oldPassword) {
      throw new ForbiddenException('OldPassword is wrong');
    }
    const updateUser = this.db.updateUser(updateUserDto, id);
    if (updateUser) {
      return this.removePassword(updateUser);
    }
  }

  remove(id: string) {
    const removeUser = this.db.deleteUser(id);
    if (!removeUser) {
      throw new NotFoundException(`User with id ${id} doesn't exist`);
    }
    return removeUser;
  }

  private removePassword(user: User) {
    const userWithoutPassword: Partial<User> = { ...user };
    delete userWithoutPassword.password;
    return userWithoutPassword;
  }
}
