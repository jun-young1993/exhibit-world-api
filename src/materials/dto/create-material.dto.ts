import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";
import { GeometryType } from "../../geometries/entities/geometry.entity";
import { ApiProperty } from "@nestjs/swagger";
import { MaterialType } from "../entities/material.entity";
import { Mesh } from "../../meshes/entities/mesh.entity";
import { CreateTextureDto } from "../../textures/dto/create-texture.dto";
import { Texture } from "../../textures/entities/texture.entity";
import { Association } from "../../associations/entities/association.entity";

export class CreateMaterialDto {

  @ApiProperty({example: MaterialType.MeshBasicMaterial, description: 'The type of the Material'})
  type: MaterialType

  @ApiProperty({ example: '#FFFFFF', description: 'Color of the material' })
  @IsOptional()
  @IsString()
  color?: string;

  @ApiProperty({ example: 0.8, description: 'Opacity of the material' })
  @IsOptional()
  @IsNumber()
  opacity?: number;

  @ApiProperty({ type: CreateTextureDto, description: 'Material creation data' })
  @IsOptional()
  texture?: Texture | CreateTextureDto;

  association!: Association;
}
