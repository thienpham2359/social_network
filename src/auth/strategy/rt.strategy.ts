import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from '../../common/constants/constants';
import { Request } from 'express';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtPayload } from '../type';
import { JwtPayloadWithRt } from '../type';

@Injectable()
export class RtStrategy extends PassportStrategy(
  Strategy,
  jwtConstants.rtStrategyName,
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConstants.rtSecret,
      passReqToCallback: true,
    });
  }

  public async validate(
    request: Request,
    payload: JwtPayload,
  ): Promise<JwtPayloadWithRt> {
    const refreshToken = request
      ?.get('authorization')
      ?.replace('Bearer', '')
      ?.trim();

    if (!refreshToken) throw new ForbiddenException('Refresh token malformed');

    return {
      ...payload,
      refreshToken,
    };
  }
}
