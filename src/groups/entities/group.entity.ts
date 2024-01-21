import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { EntityHelper } from "../../utils/entity-helper";
import { ApiProperty } from "@nestjs/swagger";
import { GithubStorage } from "../../github-storage/entities/github-storage.entity";


@Entity({name: 'group'})
export class Group extends EntityHelper{
  @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
  @PrimaryGeneratedColumn('uuid')
  id: string

  @OneToOne(
    () => GithubStorage,
    (githubStorage) => githubStorage.group,
    {eager: true, cascade: true, onDelete: "CASCADE"}
  )
  @JoinColumn()
  githubStorage: GithubStorage


}
