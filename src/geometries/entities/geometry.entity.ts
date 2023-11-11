import { EntityHelper } from "../../utils/entity-helper";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Mesh } from "../../meshes/entities/mesh.entity";

export enum GeometryType {
  Box = 'BoxGeometry',
  Sphere = 'SphereGeometry',
  Cylinder = 'CylinderGeometry',
  // Add other valid THREE.js Geometry types here
}

@Entity({name: 'geometry'})
export class Geometry extends EntityHelper{
  @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({
    type: 'enum',
    enum: GeometryType,
    default: GeometryType.Box, // Default to BoxGeometry if not specified
  })
  @Column()
  type: string;

  @Column({ nullable: true })
  width: number;

  @Column({ nullable: true })
  height: number;

  @Column({ nullable: true })
  radius: number;

  @Column({ nullable: true })
  segments: number;

  @OneToOne(() => Mesh, mesh => mesh.geometry)
  @JoinColumn({ name: 'meshId' })
  mesh: Mesh;
}
