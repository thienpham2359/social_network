import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Favorite, Feed, User } from '../../../entity';
import { Repository } from 'typeorm';
import { FavoriteDto } from '../dto/favorite.dto';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(Favorite)
    private readonly favoriteRepository: Repository<Favorite>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Feed)
    private readonly feedRepository: Repository<Feed>,
  ) {}

  public async like(userId: number, dto: FavoriteDto): Promise<boolean> {
    const favorite = await this.favoriteRepository.findOne({
      where: {
        feed: {
          id: dto.feedId,
        },
        user: {
          id: userId,
        },
      },
    });
    if (favorite) {
      throw new HttpException(
        'User already liked this feed',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.userRepository.findOneBy({ id: userId });
    const feed = await this.feedRepository.findOneBy({ id: dto.feedId });

    await this.favoriteRepository.save({ user: user, feed: feed });

    return true;
  }

  public async dislike(userId: number, dto: FavoriteDto): Promise<boolean> {
    const favorite = await this.favoriteRepository.findOne({
      where: {
        feed: {
          id: dto.feedId,
        },
        user: {
          id: userId,
        },
      },
    });
    if (!favorite) {
      throw new HttpException(
        'User already dislike this feed',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.favoriteRepository.softRemove(favorite);

    return true;
  }
}
