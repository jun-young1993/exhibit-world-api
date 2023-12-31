import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';
import { EntityHelper } from "../../utils/entity-helper";
import { Material } from "../../materials/entities/material.entity";
import { Geometry } from "../../geometries/entities/geometry.entity";
import { Texture } from "../../textures/entities/texture.entity";
import { Gltf } from "../../gltf/entities/gltf.entity";
import { Group } from "../../groups/entities/group.entity";
import { Association } from "../../associations/entities/association.entity";
import { Mesh as ThreeMesh, Object3D as ThreeObject3D } from "three";
import { isArray } from "lodash";

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

  @Column('float',{scale: 5, default: 2})
  scaleX: number;

  @Column('float',{scale: 5, default: 2})
  scaleY: number;

  @Column('float',{scale: 5, default: 2})
  scaleZ: number;

  @OneToOne(
    () => Association,
    (association) => association.mesh,
    {eager: true, cascade: true, onDelete: "CASCADE"}
  )
  @JoinColumn()
  association: Association

  @OneToOne(
    () => Geometry,
    (geometry) => geometry.mesh,
    {eager: true, cascade: true, onDelete: "CASCADE"}
  )
  @JoinColumn()
  geometry: Geometry

  @ManyToOne(
    () => Gltf,
    (gltf) => gltf.mesh,
    { nullable: true, eager: true, cascade: true, onDelete: "CASCADE"}
  )
  @JoinColumn()
  gltf?: Gltf

  @ManyToOne(
    ()=> Group,
    (group) => group.mesh
  )
  @JoinColumn()
  group: Group

  setEntity(object3D: ThreeMesh){
    this.id = object3D.uuid;

    this.type = object3D.type;

    this.positionX = object3D.position.x;
    this.positionY = object3D.position.y;
    this.positionZ = object3D.position.z;

    this.rotationX = object3D.rotation.x;
    this.rotationY = object3D.rotation.y;
    this.rotationZ = object3D.rotation.z;

    this.quaternionX = object3D.quaternion.x;
    this.quaternionY = object3D.quaternion.y;
    this.quaternionZ = object3D.quaternion.z;
    this.quaternionW = object3D.quaternion.w;

    this.scaleX = object3D.scale.x;
    this.scaleY = object3D.scale.y;
    this.scaleZ = object3D.scale.z;

    const geometry = new Geometry();
    geometry.setEntity(object3D.geometry);
    this.geometry = geometry;
    // this.association =
    const association = new Association();
    if(isArray(object3D.material)){
      association.setEntity(object3D.material);
    }else{
      association.setEntity([object3D.material]);
    }

    this.association = association;

  }

}
