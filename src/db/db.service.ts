import { UpdateAlbumDto } from 'src/albums/dto/update-album.dto';
import { UpdateUserDto } from './../users/dto/update-user.dto';
import { Injectable, Global } from '@nestjs/common';
import { Album } from 'src/albums/entities/album.entity';
import { CreateArtistDto } from 'src/artists/dto/create-artist.dto';
import { UpdateArtistDto } from 'src/artists/dto/update-artist.dto';
import { Artist } from 'src/artists/entities/artist.entity';
import { Favorite } from 'src/favorites/entities/favorite.entity';
import { Track } from 'src/tracks/entities/track.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { CreateAlbumDto } from 'src/albums/dto/create-album.dto';
import { CreateTrackDto } from 'src/tracks/dto/create-track.dto';
import { UpdateTrackDto } from 'src/tracks/dto/update-track.dto';

@Global()
@Injectable()
export class DbService {
  users: Map<string, User> = new Map();
  albums: Map<string, Album> = new Map();
  artists: Map<string, Artist> = new Map();
  tracks: Map<string, Track> = new Map();
  favorites: Favorite = {
    artists: [],
    albums: [],
    tracks: [],
  };

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

  getArtists() {
    return Array.from(this.artists.values());
  }
  getArtistById(id: string) {
    return this.artists.get(id);
  }

  createArtist(data: CreateArtistDto) {
    const newArtist: Artist = {
      id: uuidv4(),
      name: data.name,
      grammy: data.grammy,
    };

    this.artists.set(newArtist.id, newArtist);
    return newArtist;
  }

  updateArtist(data: UpdateArtistDto, id: string) {
    const updateArtist = this.artists.get(id);

    if (updateArtist) {
      updateArtist.name = data.name;
      updateArtist.grammy = data.grammy;

      return updateArtist;
    }
  }

  deleteArtist(id: string) {
    return this.artists.delete(id);
  }

  getAllFavorites() {
    return this.favorites;
  }
  getArtistsDb() {
    return this.artists;
  }
  getTracksDb() {
    return this.tracks;
  }

  getAlbumsDb() {
    return this.albums;
  }

  getAlbums() {
    return Array.from(this.albums.values());
  }

  getAlbumById(id: string) {
    return this.albums.get(id);
  }

  createAlbum(data: CreateAlbumDto) {
    const newAlbum: Album = {
      id: uuidv4(),
      name: data.name,
      year: data.year,
      artistId: data.artistId,
    };

    this.albums.set(newAlbum.id, newAlbum);
    return newAlbum;
  }

  updateAlbum(data: UpdateAlbumDto, id: string) {
    const updateAlbum = this.albums.get(id);

    if (updateAlbum) {
      updateAlbum.name = data.name;
      updateAlbum.year = data.year;
      updateAlbum.artistId = data.artistId;
      return updateAlbum;
    }
  }

  deleteAlbum(id: string) {
    return this.albums.delete(id);
  }

  getTracks() {
    return Array.from(this.tracks.values());
  }

  getTrackById(id: string) {
    return this.tracks.get(id);
  }

  createTrack(data: CreateTrackDto) {
    const newTrack: Track = {
      ...data,
      id: uuidv4(),
    };

    this.tracks.set(newTrack.id, newTrack);
    return newTrack;
  }

  updateTrack(data: UpdateTrackDto, id: string) {
    const updateTrack = this.tracks.get(id);

    if (updateTrack) {
      updateTrack.name = data.name;
      updateTrack.artistId = data.artistId;
      updateTrack.albumId = data.albumId;
      updateTrack.duration = data.duration;
      return updateTrack;
    }
  }

  deleteTrack(id: string) {
    return this.tracks.delete(id);
  }

  createFavorite(path: string, id: string) {
    const checkFavorite = this.favorites[path + 's'].includes(id);

    if (!checkFavorite) {
      this.favorites[path + 's'].push(id);
    }
  }

  deleteFavorite(path: string, id: string) {
    const checkFavorite = this.favorites[path + 's'].includes(id);

    if (checkFavorite) {
      this.favorites[path + 's'] = this.favorites[path + 's'].filter(
        (el: string) => el !== id,
      );
    }
    return checkFavorite;
  }
}
