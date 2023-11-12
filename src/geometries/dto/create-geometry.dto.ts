import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsUUID } from "class-validator";
import { GeometryType } from "../entities/geometry.entity";
import { create } from "domain";
import { Mesh } from "../../meshes/entities/mesh.entity";

export class CreateGeometryDto {
  @ApiProperty({example: 'BoxGeometry', description: 'The type of the Geometry'})
  @IsNotEmpty()
  @IsEnum(GeometryType)
  type: GeometryType;

  @ApiProperty({example: 0, description: 'The width of the Geometry'})
  @IsNotEmpty()
  @IsNumber()
  width: number;

  @ApiProperty({example: 0, description: 'The height of the Geometry'})
  @IsNotEmpty()
  @IsNumber()
  height: number;

  @ApiProperty({example: 0, description: 'The heigth of the Geometry'})
  @IsNotEmpty()
  @IsNumber()
  depth: number;
}
