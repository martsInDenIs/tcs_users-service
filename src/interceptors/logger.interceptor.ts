import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { TcpContext } from '@nestjs/microservices';
import { PinoLogger } from 'nestjs-pino';
import { catchError, Observable, tap } from 'rxjs';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(private readonly logger: PinoLogger) {
    this.logger.setContext(LoggerInterceptor.name);
  }

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const messagePattern = context
      .switchToRpc()
      .getContext<TcpContext>()
      .getPattern();

    this.logger.info(
      `Start executing process with ${messagePattern} handler...`,
    );

    return next.handle().pipe(
      tap(() => {
        this.logger.info(
          `Executing process for ${messagePattern} handler succesfully fineshed!`,
        );
      }),
      catchError((err) => {
        this.logger.error(`Error while executing ${messagePattern}: ${err}`);
        throw err;
      }),
    );
  }
}
