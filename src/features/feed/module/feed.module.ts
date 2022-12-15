import { Module } from '@nestjs/common';
import { FeedController } from '../controller/feed.controller';
import { FeedService } from '../provider/feed.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feed, User } from '../../../entity';

@Module({
  imports: [TypeOrmModule.forFeature([Feed, User])],
  controllers: [FeedController],
  providers: [FeedService],
})
export class FeedModule {}
