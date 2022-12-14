import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { SignUpDto } from '../dto';
import { AuthService } from '../provider/auth.service';
import { Token } from '../type';
import { SignInDto } from '../dto';
import { RtGuard } from '../guard';
import { GetCurrentUserId } from '../../common/decorators';
import { GetCurrentUser } from '../../common/decorators';
import { Public } from '../../common/decorators';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('sign-up')
  public async signUp(@Body() dto: SignUpDto): Promise<Token> {
    return this.authService.signUp(dto);
  }

  @Public()
  @Post('sign-in')
  public async signIn(@Body() dto: SignInDto): Promise<Token> {
    return this.authService.signIn(dto);
  }

  @Post('sign-out')
  public async signOut(@GetCurrentUserId() userId: number): Promise<boolean> {
    return this.authService.signOut(userId);
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('refresh-token')
  public async refreshToken(
    @GetCurrentUserId() userId: number,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ) {
    return this.authService.refreshToken(userId, refreshToken);
  }
}
