import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum RoleEnum {
  ADMIN = 'admin',
  MANAGER = 'manager',
  DEVELOPER = 'developer',
}

@Entity({ name: 'User' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({
    type: 'enum',
    enum: RoleEnum,
    default: RoleEnum.DEVELOPER,
  })
  role: string;
}
