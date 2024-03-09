import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post(':path/:id')
  create(@Param('path') path: string, @Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.create(path, id);
  }

  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }

  @Delete(':path/:id')
  @HttpCode(204)
  remove(@Param('path') path: string, @Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.remove(path, id);
  }
}
