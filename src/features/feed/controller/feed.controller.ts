import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { FeedService } from '../provider/feed.service';
import { Feed } from '../../../entity';
import { CreateFeedDto } from '../dto/create-feed.dto';
import { GetCurrentUserId } from '../../../common/decorators';
import { UpdateFeedDto } from '../dto/update-feed.dto';
import { UpdateFeedStatusDto } from '../dto/update-feed-status.dto';

@Controller('feed')
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @Get()
  public async getAllFeeds(): Promise<Feed[]> {
    return this.feedService.getAllFeeds();
  }

  @Get(':userId')
  public async getFeedsByUser(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<Feed[]> {
    return this.feedService.getFeedsByUser(userId);
  }

  @Post()
  public async createFeed(
    @Body() dto: CreateFeedDto,
    @GetCurrentUserId() user: number,
  ): Promise<Feed> {
    return this.feedService.createFeed(dto, user);
  }

  @Get('detail/:id')
  public async getFeedDetail(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Feed> {
    return this.feedService.getFeed(id);
  }

  @Put(':id')
  public async updateFeed(
    @Param('id', ParseIntPipe) id: number,
    @GetCurrentUserId() userId: number,
    @Body() dto: UpdateFeedDto,
  ): Promise<Feed> {
    return this.feedService.updateFeed(id, userId, dto);
  }

  @Put('status/:id')
  public async updateFeedStatus(
    @Param('id', ParseIntPipe) id: number,
    @GetCurrentUserId() userId: number,
    @Body() dto: UpdateFeedStatusDto,
  ): Promise<boolean> {
    return this.feedService.updateFeedStatus(id, userId, dto);
  }

  @Delete(':id')
  public async deleteFeed(
    @Param('id', ParseIntPipe) id: number,
    @GetCurrentUserId() userId: number,
  ): Promise<boolean> {
    return this.feedService.deleteFeed(id, userId);
  }
}
