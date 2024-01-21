import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { Group } from "./entities/group.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GithubStorage } from "../github-storage/entities/github-storage.entity";
import { GithubStorageModule } from "../github-storage/github-storage.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Group,GithubStorage]),
    GithubStorageModule
  ],
  controllers: [GroupsController],
  providers: [GroupsService],
  exports: [GroupsService]
})
export class GroupsModule {}
