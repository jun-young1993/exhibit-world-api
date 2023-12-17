import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Material } from "../../materials/entities/material.entity";
import { Mesh } from "../../meshes/entities/mesh.entity";

@Entity({name: 'association'})
export class Association extends BaseEntity {
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
    (material) => material.association,
    {eager: true}
  )
  material: Material[]
}
