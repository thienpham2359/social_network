import { Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  public async createUser(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ): Promise<User> {
    const user = await this.userRepository.findOneBy({ email: email });
    if (user)
      throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);

    return this.userRepository.save({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    });
  }

  public async updateHashedRt(userId: number, hashedRt: string) {
    await this.userRepository
      .createQueryBuilder()
      .update()
      .set({ hashedRt: hashedRt })
      .where('id = :id', { id: userId })
      .execute();
  }

  public async logout(userId: number): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });
    if (!user)
      throw new HttpException('User does not exists', HttpStatus.BAD_REQUEST);

    user.hashedRt = null;
    await this.userRepository.save(user);
    return true;
  }

  public async create(@Body() user: CreateUserDto): Promise<User> {
    return this.userRepository.save(user);
  }

  public async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  public async findOne(id: number): Promise<User | null> {
    return this.userRepository.findOneBy({ id: id });
  }

  public async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOneBy({ email });
  }

  public async delete(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
