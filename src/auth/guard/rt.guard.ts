import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { jwtConstants } from '../../common/constants/constants';

@Injectable()
export class RtGuard extends AuthGuard(jwtConstants.rtStrategyName) {}
