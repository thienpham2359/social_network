import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { UserService } from '../provider/user.service';
import { User } from '../../../entity';
import { GetCurrentUserId } from '../../../common/decorators';
import { UpdateUserDto } from '../dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  public async findUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException('NotFoundData');
    }

    return user;
  }

  @Put()
  public async updateUser(
    @GetCurrentUserId() userId: number,
    @Body() dto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateUser(userId, dto);
  }

  @Delete()
  public async deleteUser(
    @GetCurrentUserId() userId: number,
  ): Promise<boolean> {
    return this.userService.deleteUser(userId);
  }
}
