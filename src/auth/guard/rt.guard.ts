import { AuthGuard } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from '../../common/constants/constants';

@Injectable()
export class RtGuard extends AuthGuard(jwtConstants.rtStrategyName) {}
