import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserEntity } from './database/users.entity';
import { UsersModule } from './users/users.module';
import { HashModule } from './hash/hash.module';
import { LoggerModule } from 'nestjs-pino';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggerInterceptor } from './interceptors/logger.interceptor';

@Module({
  imports: [
    HashModule,
    UsersModule,
    LoggerModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        database: configService.getOrThrow('DB_NAME'),
        username: configService.getOrThrow('DB_USER'),
        password: configService.getOrThrow('DB_PASSWORD'),
        entities: [UserEntity],
        synchronize: !!configService.get('DB_SYNC'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [{ provide: APP_INTERCEPTOR, useClass: LoggerInterceptor }],
})
export class AppModule {}
