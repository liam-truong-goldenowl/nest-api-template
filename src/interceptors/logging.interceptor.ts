import { tap, Observable } from 'rxjs';
import {
  Injectable,
  CallHandler,
  NestInterceptor,
  ExecutionContext,
} from '@nestjs/common';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before handling the request...');

    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() =>
          console.log(`After handling the request... ${Date.now() - now}ms`),
        ),
      );
  }
}
