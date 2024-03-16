import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
// import { DbService } from 'src/prisma-db/db.service';
import { Prisma } from '@prisma/client';
// import { User } from './entities/user.entity';
import { PrismaService } from 'src/prisma-db/prisma-db.service';

@Injectable()
export class UsersService {
  constructor(
    // private db: DbService,
    private prisma: PrismaService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.prisma.user.create({
      data: createUserDto,
    });

    return user;
  }

  async findAll() {
    // const users = this.db.getUsers().map((user) => this.removePassword(user));
    // return users;
    return await this.prisma.user.findMany();
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: id },
    });
    if (!user) {
      throw new NotFoundException(`User with id ${id} doesn't exist`);
    }

    //return this.removePassword(user);
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { id: id },
    });
    if (!existingUser) {
      throw new NotFoundException(`User with id ${id} doesn't exist`);
    }

    if (existingUser.password !== updateUserDto.oldPassword) {
      throw new ForbiddenException('OldPassword is wrong');
    }
    const updateUser = await this.prisma.user.update({
      where: { id: id },
      data: {
        password: updateUserDto.newPassword,
        version: { increment: 1 },
      },
    });
    if (updateUser) {
      return updateUser;
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.user.delete({
        where: { id: id },
      });
      return true;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`User with id ${id} doesn't exist`);
        } else {
          throw error;
        }
      } else {
        console.error;
      }
      return false;
    }
  }
}
