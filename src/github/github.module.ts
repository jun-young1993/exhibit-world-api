import { Module } from '@nestjs/common';
import { GITHUB_CONFIG_TOKEN, GithubConfigType, GithubService } from "./github.service";
import { GithubController } from './github.controller';
import { HttpModule } from "@nestjs/axios";
import { AllConfigType, GithubConfig } from "../config/config.type";
import { HttpModuleAsyncOptions } from "@nestjs/axios/dist/interfaces";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { GithubStorageConfigName } from "../config/github-storage.config";





@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: async function (configService : ConfigService<AllConfigType>){
        const githubConfig = configService.get(GithubConfigType.BASE);
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
  controllers: [GithubController],
  providers: [GithubService],
  exports: [GithubModule, GithubService]
})
export class GithubModule {

}
