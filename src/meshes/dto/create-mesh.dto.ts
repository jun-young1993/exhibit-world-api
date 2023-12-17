import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";
import { CreateGeometryDto } from "../../geometries/dto/create-geometry.dto";
import { Geometry } from "../../geometries/entities/geometry.entity";
import { Material } from "../../materials/entities/material.entity";
import { Group } from "../../groups/entities/group.entity";
import { Association } from "../../associations/entities/association.entity";


export class CreateMeshDto {
  @ApiProperty({example: 0, description: 'The mesh of the position x'})
  @IsNotEmpty()
  @IsNumber()
  positionX: number;

  @ApiProperty({example: 0, description: 'The mesh of the position y'})
  @IsNotEmpty()
  @IsNumber()
  positionY: number;

  @ApiProperty({example: 0, description: 'The mesh of the position z'})
  @IsNotEmpty()
  @IsNumber()
  positionZ: number;

  @ApiProperty({example: 0, description: 'The mesh of the rotation x'})
  @IsNotEmpty()
  @IsNumber()
  rotationX: number;

  @ApiProperty({example: 0, description: 'The mesh of the rotation y'})
  @IsNotEmpty()
  @IsNumber()
  rotationY: number;

  @ApiProperty({example: 0, description: 'The mesh of the rotation z'})
  @IsNotEmpty()
  @IsNumber()
  rotationZ: number;

  @ApiProperty({example: 0, description: 'The mesh of the quaternion x'})
  @IsNotEmpty()
  @IsNumber()
  quaternionX: number;

  @ApiProperty({example: 0, description: 'The mesh of the quaternion y'})
  @IsNotEmpty()
  @IsNumber()
  quaternionY: number;

  @ApiProperty({example: 0, description: 'The mesh of the quaternion z'})
  @IsNotEmpty()
  @IsNumber()
  quaternionZ: number;

  @ApiProperty({example: 0, description: 'The mesh of the quaternion z'})
  @IsNotEmpty()
  @IsNumber()
  quaternionW: number;

  group!: Group

  geometry!: Geometry

  association!: Association

}
