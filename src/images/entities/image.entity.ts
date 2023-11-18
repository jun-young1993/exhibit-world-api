import { EntityHelper } from "../../utils/entity-helper";
import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Texture } from "../../textures/entities/texture.entity";

export enum ImageType {
  Texture = 'texture',
  Exhibit = 'exhibit',
  Geometry = 'geometry'
}

@Entity('image')
export class Image extends EntityHelper {
  @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  path: string;

  @Column({
    type: 'enum',
    enum: ImageType
  })
  purpose: ImageType; // 사용목적 컬럼

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt: Date;

  @OneToMany(
    () => Texture,
    (texture) => texture.image
  )
  texture: Texture
}
