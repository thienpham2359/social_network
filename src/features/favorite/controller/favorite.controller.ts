import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { GetCurrentUserId } from '../../../common/decorators';
import { FavoriteDto } from '../dto/favorite.dto';
import { FavoriteService } from '../provider/favorite.service';

@Controller('favorite')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Post('like')
  public async like(
    @GetCurrentUserId() userId: number,
    @Body() dto: FavoriteDto,
  ): Promise<boolean> {
    return this.favoriteService.like(userId, dto);
  }

  @Post('dislike')
  public async dislike(
    @GetCurrentUserId() userId: number,
    @Body() dto: FavoriteDto,
  ): Promise<boolean> {
    return this.favoriteService.dislike(userId, dto);
  }
}
