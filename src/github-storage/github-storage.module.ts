import { Module } from '@nestjs/common';
import { GithubStorageService } from './github-storage.service';
import { GithubStorageController } from './github-storage.controller';
import {  GithubModule } from "../github/github.module";
import { GithubConfigType } from "../github/github.service";
import { HttpModule } from "@nestjs/axios";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GithubStorage } from "./entities/github-storage.entity";
import { GroupsModule } from "../groups/groups.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([GithubStorage]),
    GithubModule,
    GroupsModule,
    HttpModule.registerAsync({
      useFactory: async function (configService : ConfigService){
        const githubConfig = configService.get(GithubConfigType.STORAGE);
        return {
          baseURL: githubConfig.base_url,
          headers: {
            Accept: "application/vnd.github+json",
            Authorization: `Bearer ${githubConfig.token}`,
            'X-GitHub-Api-Version': githubConfig.version
          }
        }
      },
      inject: [ConfigService]
    })
  ],
  controllers: [GithubStorageController],
  providers: [
    GithubStorageService
  ]
})
export class GithubStorageModule {}
