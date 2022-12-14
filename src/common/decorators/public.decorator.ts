import {
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
} from '@nestjs/common';
import { User } from '../../entity/user.entity';

export const Public = () => SetMetadata('isPublic', true);
