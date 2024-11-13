import { IsEmail, IsString } from 'class-validator';

export class SignInPayloadDTO {
  @IsString()
  password: string;

  @IsEmail()
  email: string;
}
