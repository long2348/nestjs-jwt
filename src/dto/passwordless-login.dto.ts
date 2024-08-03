import { IsEmail } from '@nestjs/class-validator';

export class PasswordLessLoginDto {
  @IsEmail()
  destination: string;
}
