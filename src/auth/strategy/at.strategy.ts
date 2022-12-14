import { PassportStrategy } from '@nestjs/passport';
import { jwtConstants } from '../../common/constants/constants';
import { Injectable } from '@nestjs/common';
import { JwtPayload } from '../type';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class AtStrategy extends PassportStrategy(
  Strategy,
  jwtConstants.atStrategyName,
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.atSecret,
    });
  }

  public async validate(payload: JwtPayload): Promise<JwtPayload> {
    return payload;
  }
}
