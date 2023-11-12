
import { ApiProperty } from "@nestjs/swagger";
import { CreateMeshDto } from "./create-mesh.dto";
import { CreateMaterialDto } from "../../materials/dto/create-material.dto";
import { CreateGeometryDto } from "../../geometries/dto/create-geometry.dto";

export class CreateBulkDto {
  @ApiProperty({ type: CreateMeshDto, description: 'Mesh creation data' })
  mesh: CreateMeshDto;

  @ApiProperty({ type: CreateMaterialDto, description: 'Material creation data' })
  material: CreateMaterialDto;

  @ApiProperty({ type: CreateGeometryDto, description: 'Geometry creation data' })
  geometry: CreateGeometryDto;
}