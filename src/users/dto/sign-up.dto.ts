import { IsEmail, IsEnum, IsString } from 'class-validator';
import { RoleEnum } from '../../database/users.entity';

export class SignUpPayloadDTO {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsEnum(RoleEnum)
  role: RoleEnum;
}
