import { Request } from 'express';
import { SetMetadata } from '@nestjs/common';
import { ExecutionContext, createParamDecorator } from '@nestjs/common';

import { IS_PUBLIC_KEY } from '@/utils/constants';

export type TReqUser = {
  id: number;
  username: string;
};

export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const ReqUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): TReqUser => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const { sub: id, username } = request['user'];
    return { id, username };
  },
);
