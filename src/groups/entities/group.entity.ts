import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { EntityHelper } from "../../utils/entity-helper";
import { ApiProperty } from "@nestjs/swagger";
import { Mesh } from "../../meshes/entities/mesh.entity";

@Entity({name: 'group'})
export class Group extends EntityHelper{
  @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
  @PrimaryGeneratedColumn('uuid')
  id: string

  @OneToMany(
    () => Mesh,
    (mesh) => mesh.group,
    {eager: true}
  )
  mesh: []
}
