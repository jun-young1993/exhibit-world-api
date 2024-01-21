import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { EntityHelper } from "../../utils/entity-helper";
import { ApiProperty } from "@nestjs/swagger";
import { Group } from "../../groups/entities/group.entity";
import { Exhibit } from "../../exhibits/entities/exhibit.entity";

@Entity({name: 'github_storage'})
export class GithubStorage extends EntityHelper {
  @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  path:string;

  @Column()
  filename: string;

  @OneToOne(
    () => Group,
    (group: Group) => group.githubStorage,
  )
  @JoinColumn()
  group: Group

  @OneToOne(
    () => Exhibit,
    (exhibit: Exhibit) => exhibit.githubStorage,
  )
  exhibit: Exhibit
}
