import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { GithubStorage } from "../../github-storage/entities/github-storage.entity";
import { EntityHelper } from "../../utils/entity-helper";
import { User } from "../../users/entities/user.entity";

@Entity({name: "exhibit"})
export class Exhibit extends EntityHelper {
  @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({
    default: () => "no name"
  })
  name: string;

  @ManyToOne(
    () => User,
    (user) => user.exhibit,
    {nullable: false}
  )
  @JoinColumn()
  user: User

  @OneToOne(
    () => GithubStorage,
    (githubStorage) => githubStorage.exhibit,
    {eager: true, cascade: true, onDelete: "CASCADE"}
  )
  @JoinColumn()
  githubStorage: GithubStorage

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt: Date;
}
