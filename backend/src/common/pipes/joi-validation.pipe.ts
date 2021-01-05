import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private readonly schema) {}

  transform(value: any, { type }: ArgumentMetadata): any {
    if (typeof value !== 'object' || type === 'custom') {
      return value;
    }

    const { error } = this.schema.validate(value);

    if (error) {
      throw new BadRequestException('Validation failed', error);
    }

    return value;
  }
}
