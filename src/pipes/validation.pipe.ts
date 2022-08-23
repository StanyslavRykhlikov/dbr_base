import { ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationException } from '../exceptions/validation.exception';

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    const metaType = metadata.metatype;
    if (metaType) {
      const obj = plainToClass(metaType, value);

      const errors = await validate(obj);

      if (errors.length) {
        let messages = errors.map(err => `${err.property} - ${err.constraints ? Object.values(err.constraints).join(', ') : '?'}`);
        throw new ValidationException(messages);
      }
      return value;

    } else {
      throw new HttpException('Некорректные данные', HttpStatus.BAD_REQUEST);
    }


  }

}