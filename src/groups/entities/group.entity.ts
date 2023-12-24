import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { EntityHelper } from "../../utils/entity-helper";
import { ApiProperty } from "@nestjs/swagger";
import { Mesh } from "../../meshes/entities/mesh.entity";

@Entity({name: 'group'})
export class Group extends EntityHelper{
  @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
  @PrimaryGeneratedColumn('uuid')
  id: string

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

  @OneToMany(
    () => Mesh,
    (mesh) => mesh.group,
    { eager: true, cascade: true, onDelete: "CASCADE" }
  )
  mesh: Mesh[]
}
