import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'user@mail.ru', description: 'Адрес электронной почты пользователя' })
  @IsString({ message: 'Должно быть строкой' })
  @IsEmail({}, { message: 'Некорректный email' })
  readonly email: string;

  @ApiProperty({ example: 'z%oY@G9s9#0p', description: 'Пароль пользователя, включающий любые символы' })
  @IsString({ message: 'Должно быть строкой' })
  @Length(8, 250, { message: 'Должен быть не менее 8 символов и не более 250' })
  readonly password: string;

  @ApiProperty({
    example: 'i.ivanov',
    description: 'никнейм пользовател формата [первая буква имени].[фамилия] в транскрипции',
  })
  @IsString({ message: 'Должно быть строкой' })
  @Length(3, 250, { message: 'Должно быть не менее 3 символов и не более 250' })
  readonly login: string;
}
