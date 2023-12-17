import { Material } from "../../materials/entities/material.entity";
import { ApiProperty } from "@nestjs/swagger";
import { CreateMaterialDto } from "../../materials/dto/create-material.dto";

export class CreateAssociationDto {
  @ApiProperty({ type: CreateMaterialDto, description: 'Material creation data' })
  material: Material
}
