import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';
import { EntityHelper } from "../../utils/entity-helper";
import { Material } from "../../materials/entities/material.entity";
import { Geometry } from "../../geometries/entities/geometry.entity";
import { Texture } from "../../textures/entities/texture.entity";
import { Gltf } from "../../gltf/entities/gltf.entity";
import { Group } from "../../groups/entities/group.entity";
import { Association } from "../../associations/entities/association.entity";

@Entity({name: 'mesh'})
export class Mesh extends EntityHelper{
  @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: true
  })
  type?: string;

  @Column('float',{scale: 5, default: 0})
  positionX: number;

  @Column('float',{scale: 5, default: 0})
  positionY: number;

  @Column('float',{scale: 5, default: 0})
  positionZ: number;

  @Column('float',{scale: 5, default: 0})
  rotationX: number;

  @Column('float',{scale: 5, default: 0})
  rotationY: number;

  @Column('float',{scale: 5, default: 0})
  rotationZ: number;

  @Column('float',{scale: 5, default: 0})
  quaternionX: number;

  @Column('float',{scale: 5, default: 0})
  quaternionY: number;

  @Column('float',{scale: 5, default: 0})
  quaternionZ: number;

  @Column('float',{scale: 5, default: 0})
  quaternionW: number;

  @OneToOne(
    () => Association,
    (association) => association.mesh,
    {eager: true}
  )
  @JoinColumn()
  association: Association

  @OneToOne(
    () => Geometry,
    (geometry) => geometry.mesh,
    {eager: true}
  )
  @JoinColumn()
  geometry: Geometry

  @ManyToOne(
    () => Gltf,
    (gltf) => gltf.mesh,
    { nullable: true, eager: true }
  )
  @JoinColumn()
  gltf?: Gltf

  @ManyToOne(
    ()=> Group,
    (group) => group.mesh
  )
  @JoinColumn()
  group: Group

}
