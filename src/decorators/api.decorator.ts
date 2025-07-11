import { Request } from 'express';
import { SetMetadata } from '@nestjs/common';
import { ExecutionContext, createParamDecorator } from '@nestjs/common';

import { IS_PUBLIC_KEY } from '@/utils/constants';

export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const ReqUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return request['user'];
  },
);
