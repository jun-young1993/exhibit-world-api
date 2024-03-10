import { Module } from '@nestjs/common';
import { GITHUB_CONFIG_TOKEN, GithubConfigType, GithubService } from "./github.service";
import { GithubController } from './github.controller';
import { HttpModule } from "@nestjs/axios";
import { GithubConfig } from "../config/config.type";
import { HttpModuleAsyncOptions } from "@nestjs/axios/dist/interfaces";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { GithubStorageConfigName } from "../config/github-storage.config";





@Module({
  imports: [HttpModule],
  controllers: [GithubController],
  providers: [GithubService],
  exports: [GithubModule, GithubService]
})
export class GithubModule {

}
