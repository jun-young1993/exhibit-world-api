import { Inject, Injectable } from "@nestjs/common";
import { CreateGithubDto } from './dto/create-github.dto';
import { UpdateGithubDto } from './dto/update-github.dto';
import { HttpService } from "@nestjs/axios";
import { ConfigService } from "@nestjs/config";
import { GithubConfig } from "../config/config.type";

import { GithubStorageConfigName } from "../config/github-storage.config";
export const GITHUB_CONFIG_TOKEN = 'github-config-token';
export enum GithubConfigType {
  STORAGE = GithubStorageConfigName
}
@Injectable()
export class GithubService {
  constructor(

  ){}


}
