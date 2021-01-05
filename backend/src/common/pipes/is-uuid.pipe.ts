import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { Validator } from 'class-validator';

@Injectable()
export class IsUuidPipe implements PipeTransform<any> {

  // TODO: switch to joi
  transform(value, metadata: ArgumentMetadata): string {
    const validator = new Validator();

    if (!validator.isUUID(value)) {
      throw new BadRequestException('Invalid UUID');
    }

    return value;
  }
}
