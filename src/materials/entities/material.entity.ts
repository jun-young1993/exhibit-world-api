// material.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne, BeforeInsert } from "typeorm";
import { EntityHelper } from "../../utils/entity-helper";
import { ApiProperty } from "@nestjs/swagger";
import { Mesh } from "../../meshes/entities/mesh.entity";
import { Geometry } from "../../geometries/entities/geometry.entity";

export enum MaterialType {
  MeshBasicMaterial = 'MeshBasicMaterial'
}

@Entity('material')
export class Material extends EntityHelper{
  @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({
    type: 'enum',
    enum: MaterialType,
    default: MaterialType.MeshBasicMaterial, // 기본 MaterialType 설정
  })
  type: MaterialType;

  @Column({ nullable: true })
  color: string;

  @Column({ nullable: true })
  opacity: number;

  @Column({ nullable: true })
  map: string;

  @OneToOne(
    () => Mesh,
    (mesh) => mesh.material
  )
  mesh: Mesh;

}
