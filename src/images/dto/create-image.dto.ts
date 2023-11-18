import { ApiProperty } from "@nestjs/swagger";
import { isEnum, IsString } from "class-validator";
import { ImageType } from "../entities/image.entity";

interface CreateImageDtoInterface {
  name: string
  path: string
  purpose: ImageType
}

export class CreateImageDto {
  constructor(property: CreateImageDtoInterface) {
    this.name = property.name;
    this.path = property.path;
    this.purpose = property.purpose;
  }

  @IsString()
  name: string;

  @IsString()
  path: string;

  @IsString()
  purpose: ImageType;
}
