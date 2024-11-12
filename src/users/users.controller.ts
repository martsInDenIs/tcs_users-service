import {
  Controller,
  Get,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { SignUpPayloadDTO } from './dto/sign-up.dto';
import { SignUpInterceptor } from './interceptors/sign-up.interceptor';
import { UserAlreadyExistsGuard } from './guards/user-already-exists.guard';
import { SignUpTransforPipe } from './pipes/sign-up.pipe';

@Controller()
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @UseGuards(UserAlreadyExistsGuard)
  @UseInterceptors(SignUpInterceptor)
  @MessagePattern('sign-up')
  async register(
    @Payload(new ValidationPipe(), SignUpTransforPipe) data: SignUpPayloadDTO,
  ) {
    return this.service.register(data);
  }

  @Get()
  // @MessagePattern('sign-in')
  login() {}
}
