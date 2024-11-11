import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

export class HashService {
  private salt: string;

  constructor(private readonly configService: ConfigService) {
    this.salt = configService.getOrThrow<string>('BCRYPT_SALT');
  }

  hash(data: string | Buffer) {
    return bcrypt.hash(data, this.salt);
  }

  compare(data: string | Buffer, hash: string) {
    return bcrypt.compare(data, hash);
  }
}
