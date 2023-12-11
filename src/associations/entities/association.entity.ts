import { ApiProperty } from "@nestjs/swagger";
import { Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Material } from "../../materials/entities/material.entity";
import { Mesh } from "../../meshes/entities/mesh.entity";

@Entity({name: 'association'})
export class Association {
  @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
  @PrimaryGeneratedColumn('uuid')
  id: string

  @OneToOne(
    () => Mesh,
    (mesh) => mesh.association
  )
  mesh: Mesh;

  @OneToMany(
    () => Material,
    (material) => material.association
  )
  material: []
}
