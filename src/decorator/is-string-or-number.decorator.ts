import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsStringOrNumber(validationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsStringOrNumber',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: {
        message: 'must be number or string',
        ...validationOptions,
      },
      validator: {
        validate(value: any) {
          return typeof value === 'string' || typeof value === 'number';
        },
      },
    });
  };
}