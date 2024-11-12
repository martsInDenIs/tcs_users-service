import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../database/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  hasUser(email: string) {
    return this.usersRepository.exists({ where: { email } });
  }

  register(data: Omit<UserEntity, 'id'>): Promise<UserEntity> {
    return this.usersRepository.save(data);
  }
}
