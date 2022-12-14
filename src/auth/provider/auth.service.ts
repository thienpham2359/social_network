import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserService } from '../../features/user/provider/user.service';
import { SignUpDto } from '../dto';
import * as bcrypt from 'bcrypt';
import { Token } from '../type';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../../common/constants/constants';
import { SignInDto } from '../dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  public async signUp(dto: SignUpDto): Promise<Token> {
    const newUser = await this.userService.createUser(
      dto.firstName,
      dto.lastName,
      dto.email,
      await this.hashData(dto.password),
    );

    const token = await this.getToken(newUser.id, newUser.email);
    await this.updateHashedRt(newUser.id, token.refresh_token);
    return token;
  }

  public async signIn(dto: SignInDto): Promise<Token> {
    const user = await this.userService.findByEmail(dto.email);
    if (!user) throw new ForbiddenException('Access Denied');

    const passwordMatches = await bcrypt.compare(dto.password, user.password);
    if (!passwordMatches) throw new ForbiddenException('Access Denied');

    const token = await this.getToken(user.id, user.email);
    await this.updateHashedRt(user.id, token.refresh_token);
    return token;
  }

  public async signOut(userId: number): Promise<boolean> {
    return this.userService.logout(userId);
  }

  public async refreshToken(userId: number, refreshToken: string) {
    const user = await this.userService.findOne(userId);
    if (!user) throw new ForbiddenException('Access Denied');

    const refreshTokenMatches = await bcrypt.compare(
      refreshToken,
      user.hashedRt,
    );
    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');

    const token = await this.getToken(user.id, user.email);
    await this.updateHashedRt(user.id, token.refresh_token);
    return token;
  }

  private async updateHashedRt(userId: number, refreshToken: string) {
    await this.userService.updateHashedRt(
      userId,
      await this.hashData(refreshToken),
    );
  }

  private async getToken(userId: number, email: string): Promise<Token> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email: email,
        },
        {
          secret: jwtConstants.atSecret,
          expiresIn: jwtConstants.atExpireIn,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email: email,
        },
        {
          secret: jwtConstants.rtSecret,
          expiresIn: jwtConstants.rtExpireIn,
        },
      ),
    ]);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  private async hashData(data: string): Promise<string> {
    return await bcrypt.hash(data, 10);
  }
}
