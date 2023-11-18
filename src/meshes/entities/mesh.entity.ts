import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';
import { EntityHelper } from "../../utils/entity-helper";
import { Material } from "../../materials/entities/material.entity";
import { Geometry } from "../../geometries/entities/geometry.entity";
import { Texture } from "../../textures/entities/texture.entity";

@Entity({name: 'mesh'})
export class Mesh extends EntityHelper{
  @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: true
  })
  type?: string;

  @Column()
  positionX: number;

  @Column()
  positionY: number;

  @Column()
  positionZ: number;

  @Column()
  rotationX: number;

  @Column()
  rotationY: number;

  @Column()
  rotationZ: number;

  @Column()
  quaternionX: number;

  @Column()
  quaternionY: number;

  @Column()
  quaternionZ: number;

  @Column()
  quaternionW: number;

  @OneToOne(
    () => Material,
    (material) => material.mesh
  )
  @JoinColumn()
  material: Material

  @OneToOne(
    () => Geometry,
    (geometry) => geometry.mesh
  )
  @JoinColumn()
  geometry: Geometry

}
