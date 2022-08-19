import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'user@mail.ru',
    description: 'Адрес электронной почты пользователя',
  })
  readonly email: string;

  @ApiProperty({
    example: 'z%oY@G9s9#0p',
    description: 'Пароль пользователя, включающий любые символы',
  })
  readonly password: string;

  @ApiProperty({
    example: 'i.ivanov',
    description:
      'никнейм пользовател формата [первая буква имени].[фамилия] в транскрипции',
  })
  readonly nickname: string;
}
