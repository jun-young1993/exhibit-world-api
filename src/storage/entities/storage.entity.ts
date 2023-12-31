import { EntityHelper } from "../../utils/entity-helper";
import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ImageType } from "../../images/entities/image.entity";

export enum StorageType {
  LOCAL = 'local'
}

@Entity('storage')
export class Storage extends EntityHelper {
  @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  path: string;

  @Column({
    type: 'enum',
    enum: StorageType
  })
  type: StorageType;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt: Date;
}
