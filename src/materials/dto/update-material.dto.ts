import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateMaterialDto } from './create-material.dto';
import { IsOptional } from "class-validator";

export class UpdateMaterialDto extends PartialType(CreateMaterialDto) {
  
}
