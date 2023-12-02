// material.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne, BeforeInsert } from "typeorm";
import { EntityHelper } from "../../utils/entity-helper";
import { ApiProperty } from "@nestjs/swagger";
import { Mesh } from "../../meshes/entities/mesh.entity";
import { Geometry } from "../../geometries/entities/geometry.entity";
import { Texture } from "../../textures/entities/texture.entity";
import { optionalRequire } from "@nestjs/core/helpers/optional-require";

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

  @Column({ default: '#ffffff' })
  color: string;

  @Column('float',{ default: 1 , scale: 2})
  opacity: number;

  @OneToOne(
    () => Mesh,
    (mesh) => mesh.material
  )
  mesh: Mesh;

  @OneToOne(
    () => Texture,
    (texture) => texture.material,
    { nullable: true }
  )
  @JoinColumn()
  texture?: Texture
}
