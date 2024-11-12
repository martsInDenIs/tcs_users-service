import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashService implements OnApplicationBootstrap {
  private salt: string;

  async onApplicationBootstrap() {
    this.salt = await bcrypt.genSalt();
  }

  hash(data: string | Buffer) {
    return bcrypt.hash(data, this.salt);
  }

  compare(data: string | Buffer, hash: string) {
    return bcrypt.compare(data, hash);
  }
}
