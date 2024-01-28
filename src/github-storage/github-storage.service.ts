import { Injectable } from '@nestjs/common';
import { GithubConfigType, GithubService } from "../github/github.service";
import { ConfigService } from "@nestjs/config";
import { HttpService } from "@nestjs/axios";
import { AxiosResponse, AxiosRequestConfig } from "axios";
import { AllConfigType, GithubStorageConfig } from "../config/config.type";
import { Express } from "express";
import * as fs from "fs";
import { InjectRepository } from "@nestjs/typeorm";
import { GithubStorage } from "./entities/github-storage.entity";
import { Repository } from "typeorm";
import { Observable } from "rxjs";
import { Github } from "../github/entities/github.entity";

export interface GithubRepositoryContent {
  message: string,
  content: string,
  committer: {
    name: string,
    email: string
  },
  sha?: string
}

@Injectable()
export class GithubStorageService {
  private options: GithubStorageConfig;
  constructor(
    private readonly httpService: HttpService,
    private readonly githubService: GithubService,
    private readonly configService: ConfigService<AllConfigType>,
    @InjectRepository(GithubStorage)
    private readonly githubStorageRepository: Repository<GithubStorage>
  ) {
    this.options = this.configService.get(GithubConfigType.STORAGE);
  }

  async findOne(id: string) {
    const githubStorage = await this.githubStorageRepository.findOneBy({ id: id })
    const content = await this.httpService.axiosRef.get(
      `${this.options.endpoint.content}/${githubStorage.path}`
    )
    const sha = content.data.sha;
    return {
      download_url: `${content.data.download_url}?token=${sha}`
    }
  }

  findAll() {
    return this.githubStorageRepository.find();
  }

  async create(file: Express.Multer.File): Promise<GithubStorage>
  {
    const filename = file.filename;
    const target = this.currentFileTarget(filename);

    const githubStorage = await this.githubStorageRepository.save(
      this.githubStorageRepository.create({
        path: target,
        filename: filename,
      })
    )

    await this.putContent(githubStorage, file);
    return githubStorage;

  }
  async getContent(githubStorage: GithubStorage): Promise<AxiosResponse<GithubRepositoryContent>>
  {
    return await this.httpService.axiosRef.get(
      `${this.options.endpoint.content}/${githubStorage.path}`
    )
  }

  async deleteContent(githubStorage: GithubStorage){
    const content = await this.getContent(githubStorage);

    const result = await this.httpService.axiosRef.delete(
      `${this.options.endpoint.content}/${githubStorage.path}`, {
        data: {
          owner: this.options.owner,
          repo: this.options.repo,
          path: githubStorage.path,
          committer: this.options.committer,
          sha: content.data.sha,
          author: this.options.committer
        },
    });
    return result;
  }

  async putContent(githubStorage: GithubStorage, file: Express.Multer.File, update?: boolean) {

    const content = fs.readFileSync(file.path, 'base64');
    const data:GithubRepositoryContent = {
      message: 'my commit message',
      content: content,
      committer: this.options.committer
    }
    if(update){
      const getContent = await this.getContent(githubStorage);
      data.sha = getContent.data.sha;
    }

    const result = await this.httpService.axiosRef.put(
      `${this.options.endpoint.content}/${githubStorage.path}`,
      data
    )
    console.log("=>(github-storage.service.ts:100) result", result.data);
    return result;
  }

  currentFileTarget(filename: string){
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = ("0" + date.getDate()).slice(-2);
    const target = `${year}/${month}/${day}/${filename}`;
    return target;
  }
}
