// material.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from "typeorm";
import { EntityHelper } from "../../utils/entity-helper";
import { ApiProperty } from "@nestjs/swagger";
import { Mesh } from "../../meshes/entities/mesh.entity";


@Entity('material')
export class Material extends EntityHelper{
  @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  type: string;

  @Column({ nullable: true })
  color: string;

  @Column({ nullable: true })
  opacity: number;

  @Column({ nullable: true })
  map: string;

  @OneToOne(() => Mesh, mesh => mesh.material)
  @JoinColumn({ name: 'meshId' })
  mesh: Mesh;
}
