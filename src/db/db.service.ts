import { UpdateUserDto } from './../users/dto/update-user.dto';
import { Injectable, Global } from '@nestjs/common';
import { Album } from 'src/albums/entities/album.entity';
import { Artist } from 'src/artists/entities/artist.entity';
import { Favorite } from 'src/favorites/entities/favorite.entity';
import { Track } from 'src/tracks/entities/track.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';

@Global()
@Injectable()
export class DbService {
  users: Map<string, User> = new Map();
  albums: Map<string, Album> = new Map();
  artist: Map<string, Artist> = new Map();
  tracks: Map<string, Track> = new Map();
  favorites: Favorite[] = [];

  getUsers() {
    return Array.from(this.users.values());
  }

  getUserById(id: string) {
    return this.users.get(id);
  }
  createUser(data: CreateUserDto) {
    const newUser: User = {
      id: uuidv4(),
      login: data.login,
      password: data.password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.users.set(newUser.id, newUser);
    return newUser;
  }

  updateUser(data: UpdateUserDto, id: string) {
    const updatedUser = this.users.get(id);
    if (updatedUser) {
      updatedUser.password = data.newPassword;
      updatedUser.version = updatedUser.version + 1;
      updatedUser.updatedAt = Date.now();
    }
    return updatedUser;
  }
  deleteUser(id: string) {
    return this.users.delete(id);
  }
}
