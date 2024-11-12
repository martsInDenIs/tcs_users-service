import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/database/users.entity';

@Injectable()
export class AccessTokenService {
  constructor(private readonly jwt: JwtService) {}

  encode(data: UserEntity) {
    return this.jwt.sign({
      id: data.id,
      role: data.role,
    });
  }
}
