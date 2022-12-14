import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../../entity/user.entity';

export const GetCurrentUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext): User | null => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    return data ? user?.[data] : user;
  },
);
