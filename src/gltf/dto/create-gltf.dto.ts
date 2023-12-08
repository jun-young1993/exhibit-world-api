import { ImageType } from "../../images/entities/image.entity";
import { IsString } from "class-validator";

interface CreateGltfDtoInterface {
  name: string
  path: string
}
export class CreateGltfDto {
  constructor(property: CreateGltfDtoInterface) {
    this.name = property.name;
    this.path = property.path;
  }
  @IsString()
  name: string;

  @IsString()
  path: string;
}
