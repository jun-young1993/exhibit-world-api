// material.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne, BeforeInsert } from "typeorm";
import { EntityHelper } from "../../utils/entity-helper";
import { ApiProperty } from "@nestjs/swagger";
import { Mesh } from "../../meshes/entities/mesh.entity";
import { Geometry, GeometryType } from "../../geometries/entities/geometry.entity";
import { Texture } from "../../textures/entities/texture.entity";
import { optionalRequire } from "@nestjs/core/helpers/optional-require";
import { Association } from "../../associations/entities/association.entity";
import { Color, Material as ThreeMaterial } from "three";

export enum MaterialType {
  BASIC = 'MeshBasicMaterial',
  STANDARD = 'MeshStandardMaterial'
}

@Entity('material')
export class Material extends EntityHelper{
  @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: MaterialType,
    default: MaterialType.BASIC, // 기본 MaterialType 설정
  })
  type: MaterialType;

  @Column({ default: '#ffffff' })
  color: string;

  @Column('float',{ default: 1 , scale: 2})
  opacity: number;

  @OneToOne(
    () => Texture,
    (texture) => texture.material,
    { nullable: true, eager: true, onDelete: "CASCADE" }
  )
  @JoinColumn()
  texture?: Texture

  @ManyToOne(
    ()=> Association,
    (association) => association.material
  )
  @JoinColumn()
  association: Association

  setEntity(material: ThreeMaterial){

    this.id = material.uuid;
    this.type = MaterialType[Object.keys(MaterialType)
      .find(key => MaterialType[key as keyof typeof MaterialType] === material.type)
      ];
    if('color' in material){
      const color = material.color as Color;
      this.color = `#${color.getHexString()}`;
    }
    this.opacity = material.opacity;
  }

}
