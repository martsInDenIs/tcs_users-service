import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserEntity } from './database/users.entity';
import { UsersModule } from './users/users.module';
import { HashModule } from './hash/hash.module';

@Module({
  imports: [
    HashModule,
    UsersModule,
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
})
export class AppModule {}
