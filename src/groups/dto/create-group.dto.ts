
import { ApiProperty } from "@nestjs/swagger";
import { CreateMaterialDto } from "../../materials/dto/create-material.dto";
import { CreateGeometryDto } from "../../geometries/dto/create-geometry.dto";
import { CreateMeshDto } from "../../meshes/dto/create-mesh.dto";

export class CreateGroupDto {
  @ApiProperty({ type: CreateMeshDto, description: 'Mesh creation data' })
  mesh: CreateMeshDto;

  @ApiProperty({ type: CreateMaterialDto, description: 'Material creation data' })
  material: CreateMaterialDto;

  @ApiProperty({ type: CreateGeometryDto, description: 'Geometry creation data' })
  geometry: CreateGeometryDto;
}