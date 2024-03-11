import { Inject, Injectable } from "@nestjs/common";
import { CreateGithubDto } from './dto/create-github.dto';
import { UpdateGithubDto } from './dto/update-github.dto';
import { HttpService } from "@nestjs/axios";
import { ConfigService } from "@nestjs/config";
import { AllConfigType, GithubBaseConfig, GithubConfig } from "../config/config.type";

import { GithubStorageConfigName } from "../config/github-storage.config";
import { GithubConfigName } from "src/config/github.config";
import { plainToClass } from "class-transformer";
export const GITHUB_CONFIG_TOKEN = 'github-config-token';
export enum GithubConfigType {
  STORAGE = GithubStorageConfigName,
  BASE = GithubConfigName
}
interface GithubReleaseResponse {  
  name: string
  created_at: Date
  body: string
}

@Injectable()
export class GithubService {
  private options: GithubBaseConfig;
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService<AllConfigType>,
  ){
    this.options = this.configService.get(GithubConfigType.BASE);
  }

  async findAllByRelease(): Promise<[]|GithubReleaseResponse[]>
  {
    const releases = await this.httpService.axiosRef.get<[]|GithubReleaseResponse[]>(
      `${this.options.endpoint.releases}`
    )
    
    return releases.data.map(({name, created_at, body}: GithubReleaseResponse) => {
      return {
        name,
        created_at,
        body
      }
    })
    
  }

}
