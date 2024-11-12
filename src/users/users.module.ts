import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../database/users.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { HashModule } from 'src/hash/hash.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SignUpInterceptor } from './interceptors/sign-up.interceptor';
import { AccessTokenService } from './services/access-token.service';
import { UserAlreadyExistsGuard } from './guards/user-already-exists.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    HashModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: '1d',
        },
      }),
    }),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    SignUpInterceptor,
    UserAlreadyExistsGuard,
    AccessTokenService,
  ],
})
export class UsersModule {}
