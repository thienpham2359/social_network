import { Module } from '@nestjs/common';
import { FavoriteController } from '../controller/favorite.controller';
import { FavoriteService } from '../provider/favorite.service';
import { UserService } from '../../user/provider/user.service';
import { FeedService } from '../../feed/provider/feed.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorite, Feed, User } from '../../../entity';

@Module({
  imports: [TypeOrmModule.forFeature([Feed, User, Favorite])],
  controllers: [FavoriteController],
  providers: [FavoriteService, UserService, FeedService],
})
export class FavoriteModule {}
