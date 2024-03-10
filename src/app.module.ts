import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ArtistsModule } from './artists/artists.module';
import { AlbumsModule } from './albums/albums.module';
import { FavoritesModule } from './favorites/favorites.module';
import { TracksModule } from './tracks/tracks.module';
import { DbModule } from './db/db.module';
import { ConfigModule } from '@nestjs/config';
import { AuthResolver } from './auth/auth.resolver';

@Module({
  imports: [
    UsersModule,
    ArtistsModule,
    AlbumsModule,
    FavoritesModule,
    TracksModule,
    DbModule,
    ConfigModule.forRoot({ envFilePath: '.env' }),
  ],
  controllers: [AppController],
  providers: [AppService, AuthResolver],
})
export class AppModule {}
