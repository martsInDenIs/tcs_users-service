import {
  BadRequestException,
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { SignUpPayloadDTO } from './dto/sign-up.dto';
import { EncodeAccessTokenInterceptor } from './interceptors/encode-access-token.interceptor';
import { UserAlreadyExistsGuard } from './guards/user-already-exists.guard';
import { SignUpTransforPipe } from './pipes/sign-up.pipe';
import { SignInPayloadDTO } from './dto/sign-in.dto';
import { HashService } from 'src/hash/hash.service';

@Controller()
export class UsersController {
  constructor(
    private readonly service: UsersService,
    private readonly hashService: HashService,
  ) {}

  @UseGuards(UserAlreadyExistsGuard)
  @UseInterceptors(EncodeAccessTokenInterceptor)
  @MessagePattern('sign-up')
  async register(
    @Payload(new ValidationPipe(), SignUpTransforPipe) data: SignUpPayloadDTO,
  ) {
    return this.service.create(data);
  }

  @UseInterceptors(EncodeAccessTokenInterceptor)
  @Post('sign-in')
  async login(@Payload(new ValidationPipe()) credentials: SignInPayloadDTO) {
    const user = await this.service.findOne({ email: credentials.email });

    const doesPasswordMatch = await this.hashService.compare(
      credentials.password,
      user.password,
    );

    if (!doesPasswordMatch) {
      throw new BadRequestException(
        'User with given password and email doesn`t exists! Please, check it again.',
      );
    }

    return user;
  }
}
