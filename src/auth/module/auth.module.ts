import { Module } from '@nestjs/common';
import { AuthService } from '../provider/auth.service';
import { UserModule } from '../../features/user/module/user.module';
import { UserController } from '../../features/user/controller/user.controller';
import { AuthController } from '../controller/auth.controller';
import { AtStrategy } from '../strategy/at.strategy';
import { RtStrategy } from '../strategy/rt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [UserModule, PassportModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, AtStrategy, RtStrategy],
})
export class AuthModule {}
