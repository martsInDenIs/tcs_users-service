import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { UserEntity } from 'src/database/users.entity';
import { AccessTokenService } from '../services/access-token.service';
import { SignUpResponse } from '../users.types';

@Injectable()
export class SignUpInterceptor implements NestInterceptor {
  constructor(private readonly accessToken: AccessTokenService) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<UserEntity>,
  ): Observable<SignUpResponse> | Promise<Observable<SignUpResponse>> {
    return next.handle().pipe(
      map((value) => ({
        accessToken: this.accessToken.encode(value),
      })),
    );
  }
}
