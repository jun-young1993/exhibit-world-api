import { CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { GithubStorage } from "../../github-storage/entities/github-storage.entity";

@Entity({name: "exhibit"})
export class Exhibit {
  @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
  @PrimaryGeneratedColumn('uuid')
  id: string

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
