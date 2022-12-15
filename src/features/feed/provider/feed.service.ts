import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Feed, User } from '../../../entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFeedDto } from '../dto/create-feed.dto';
import { UpdateFeedDto } from '../dto/update-feed.dto';
import { UpdateFeedStatusDto } from '../dto/update-feed-status.dto';

@Injectable()
export class FeedService {
  constructor(
    @InjectRepository(Feed)
    private readonly feedRepository: Repository<Feed>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async getAllFeeds(): Promise<Feed[]> {
    return this.feedRepository.find({
      where: {
        isActive: true,
      },
    });
  }

  public async getFeedsByUser(userId: number): Promise<Feed[]> {
    return this.feedRepository.find({
      relations: {
        user: true,
      },
      where: {
        user: {
          id: userId,
        },
      },
    });
  }

  public async createFeed(dto: CreateFeedDto, userId: number): Promise<Feed> {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });
    if (!user)
      throw new HttpException('User does not exists', HttpStatus.BAD_REQUEST);

    const newFeed: Feed = new Feed();
    newFeed.content = dto.content;
    newFeed.user = user;

    return this.feedRepository.save(newFeed);
  }

  public async getFeed(id: number): Promise<Feed> {
    return this.feedRepository.findOne({ where: { id: id } });
  }

  public async updateFeed(
    id: number,
    userId: number,
    dto: UpdateFeedDto,
  ): Promise<Feed> {
    const feed = await this.findFeed(id);
    if (!feed)
      throw new HttpException('Feed does not exists', HttpStatus.BAD_REQUEST);

    if (feed.user.id != userId)
      throw new HttpException(
        "You don't have permission to update this feed",
        HttpStatus.BAD_REQUEST,
      );

    feed.content = dto.content;

    return this.feedRepository.save(feed);
  }

  public async updateFeedStatus(
    id: number,
    userId: number,
    dto: UpdateFeedStatusDto,
  ): Promise<boolean> {
    const feed = await this.findFeed(id);
    if (!feed)
      throw new HttpException('Feed does not exists', HttpStatus.BAD_REQUEST);

    if (feed.user.id != userId)
      throw new HttpException(
        "You don't have permission to update this feed",
        HttpStatus.BAD_REQUEST,
      );

    feed.isActive = dto.isActive;

    await this.feedRepository.save(feed);
    return true;
  }

  public async deleteFeed(id: number, userId: number): Promise<boolean> {
    const feed = await this.findFeed(id);
    if (!feed)
      throw new HttpException('Feed does not exists', HttpStatus.BAD_REQUEST);

    if (feed.user.id != userId)
      throw new HttpException(
        "You don't have permission to delete this feed",
        HttpStatus.BAD_REQUEST,
      );

    await this.feedRepository.softRemove(feed);
    return true;
  }

  private async findFeed(id: number): Promise<Feed> {
    return await this.feedRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        user: true,
      },
    });
  }
}
