import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { EntityHelper } from "../../utils/entity-helper";
import { ApiProperty } from "@nestjs/swagger";
import { GithubStorage } from "../../github-storage/entities/github-storage.entity";
import { User } from "src/users/entities/user.entity";


@Entity({name: 'group'})
export class Group extends EntityHelper{
  @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    default: 'no name'
  })
  name: string;

  @OneToOne(
    () => GithubStorage,
    (githubStorage) => githubStorage.group,
    {nullable: false, eager: true, cascade: true, onDelete: "CASCADE"}
  )
  @JoinColumn()
  githubStorage: GithubStorage

  @ManyToOne(
    () => User,
    (user) => user.group,
    {nullable: false}
  )
  @JoinColumn()
  user: User


}
