import { Controller, ValidationPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { SignUpPayloadDTO } from './dto/sign-up.dto';
import { HashService } from 'src/hash/hash.service';

@Controller()
export class UsersController {
  constructor(
    private readonly service: UsersService,
    private readonly hashService: HashService,
  ) {}

  @MessagePattern('sign-up')
  async register(@Payload(new ValidationPipe()) data: SignUpPayloadDTO) {
    const passwordHash = await this.hashService.hash(data.password);

    return this.service.register({ ...data, password: passwordHash });
  }
}
