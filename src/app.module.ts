import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ArtistsModule } from './artists/artists.module';
import { AlbumsModule } from './albums/albums.module';
import { FavoritesModule } from './favorites/favorites.module';
import { TracksModule } from './tracks/tracks.module';
import { PrismaDbModule } from './prisma-db/prisma-db.module';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    UsersModule,
    ArtistsModule,
    AlbumsModule,
    FavoritesModule,
    TracksModule,
    PrismaDbModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
