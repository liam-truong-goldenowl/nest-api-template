import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  Injectable,
  CallHandler,
  NestInterceptor,
  ExecutionContext,
} from '@nestjs/common';

interface ISuccessResponse<T> {
  data: T;
  metadata?: Record<string, unknown>;
}

interface ISuccessResponseParams<T> {
  data: T;
  metadata?: Record<string, unknown>;
}

function respond<T>(data: T | ISuccessResponseParams<T>): ISuccessResponse<T> {
  if (data && typeof data === 'object' && 'metadata' in data) {
    const { metadata, data: datum } = data;

    return {
      data: datum,
      metadata,
    };
  }

  return {
    data: data as T,
    metadata: {},
  };
}

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, ISuccessResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ISuccessResponse<T>> {
    return next.handle().pipe(map((data: T) => respond(data)));
  }
}
