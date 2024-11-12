import {
  CanActivate,
  ConflictException,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { UsersService } from '../users.service';
import { SignUpPayloadDTO } from '../dto/sign-up.dto';
import { from, Observable, tap } from 'rxjs';

@Injectable()
export class UserAlreadyExistsGuard implements CanActivate {
  constructor(private readonly service: UsersService) {}

  canActivate(context: ExecutionContext): boolean | Observable<boolean> {
    // TODO: Change after moving to the microservice structure (switchToRPC)
    const body = context.getArgByIndex<Partial<SignUpPayloadDTO>>(0);

    if (!body.email) {
      return true;
    }

    return from(this.service.hasUser(body.email)).pipe(
      tap((doesExist) => {
        if (doesExist) {
          throw new ConflictException(
            'User with the given email already exists!',
          );
        }
      }),
    );
  }
}
