import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;    // 반드시 입력해야 하며, 이메일 형식이어야 함

  @IsOptional()
  @IsNotEmpty()
  name?: string;    // 선택 사항이지만, 존재한다면 빈 문자열은 안 됨
}