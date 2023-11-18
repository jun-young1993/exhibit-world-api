import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Mesh } from "../../meshes/entities/mesh.entity";
import { Material } from "../../materials/entities/material.entity";
import { EntityHelper } from "../../utils/entity-helper";
import { Image } from "../../images/entities/image.entity";

@Entity('texture')
export class Texture extends EntityHelper{
  @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ default: 1001 })
  wrapT: number;

  @Column({ default: 1001 })
  wrapS: number;

  @Column({ default: 1 })
  repeatX: number;

  @Column({ default: 1 })
  repeatY: number;


  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt: Date;

  @ManyToOne(
    () => Image,
    (image) => image.texture
  )
  @JoinColumn()
  image: Image

  @OneToOne(
    () => Material,
    (material) => material.texture
  )
  material: Material
}
