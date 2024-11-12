import { Injectable, PipeTransform } from '@nestjs/common';
import { SignUpPayloadDTO } from '../dto/sign-up.dto';
import { HashService } from 'src/hash/hash.service';

@Injectable()
export class SignUpTransforPipe implements PipeTransform {
  constructor(private hashService: HashService) {}

  async transform(payload: SignUpPayloadDTO): Promise<SignUpPayloadDTO> {
    const passwordHash = await this.hashService.hash(payload.password);

    return { ...payload, password: passwordHash };
  }
}
