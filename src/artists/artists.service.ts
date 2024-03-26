import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
// import { DbService } from 'src/prisma-db/db.service';
import { PrismaService } from 'src/prisma-db/prisma-db.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ArtistsService {
  constructor(private prisma: PrismaService) {}

  async create(createArtistDto: CreateArtistDto) {
    return await this.prisma.artist.create({
      data: createArtistDto,
    });
  }

  async findAll() {
    return await this.prisma.artist.findMany();
  }

  async findOne(id: string) {
    const artist = await this.prisma.artist.findUnique({
      where: { id: id },
    });
    if (!artist) {
      throw new NotFoundException(`Artist with id ${id} doesn't exist`);
    }

    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    try {
      const updateArtist = await this.prisma.artist.update({
        where: { id: id },
        data: updateArtistDto,
      });
      return updateArtist;
    } catch (err) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === 'P2025'
      ) {
        throw new NotFoundException(`Artist with id ${id} doesn't exist`);
      } else {
        throw err;
      }
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.artist.delete({
        where: { id: id },
      });
      return true;
    } catch (err) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === 'P2025'
      ) {
        throw new NotFoundException(`Artist with id ${id} doesn't exist`);
      } else {
        throw err;
      }
    }
  }
}
