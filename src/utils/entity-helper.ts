import { ClassTransformOptions, instanceToPlain } from 'class-transformer';
import { AfterLoad, BaseEntity } from 'typeorm';

export class EntityHelper extends BaseEntity {
  __entity?: string;

  @AfterLoad()
  setEntityName() {
    this.__entity = this.constructor.name;
  }

  toJSON(options?:ClassTransformOptions) {
    return instanceToPlain(this,options);
  }
}