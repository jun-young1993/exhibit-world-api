import { Injectable } from '@nestjs/common';
import { CreateGithubStorageDto } from './dto/create-github-storage.dto';
import { UpdateGithubStorageDto } from './dto/update-github-storage.dto';
import { GithubConfigType, GithubService } from "../github/github.service";
import { ConfigService } from "@nestjs/config";
import { HttpService } from "@nestjs/axios";
import { AllConfigType, GithubStorageConfig, MulterConfig } from "../config/config.type";
import { Express } from "express";
import * as fs from "fs";
import { InjectRepository } from "@nestjs/typeorm";
import { GithubStorage } from "./entities/github-storage.entity";
import { Repository } from "typeorm";

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
    return {
      download_url: content.data.download_url
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
  async getContent(githubStorage: GithubStorage): Promise<{data: {sha: string}}>
  {
    return await this.httpService.axiosRef.get(
      `${this.options.endpoint.content}/${githubStorage.path}`
    )
  }
  async deleteContent(githubStorage: GithubStorage, params){
    const result = await this.httpService.axiosRef.delete(
      `${this.options.endpoint.content}/${githubStorage.path}`,
      params
    )
    return result;
  }

  async putContent(githubStorage: GithubStorage, file: Express.Multer.File, update?: boolean) {

    const content = fs.readFileSync(file.path, 'base64');
    const data:{
      message: string,
      content: string,
      committer: {
        name: string,
        email: string
      },
      sha?: string
    } = {
      message: 'my commit message',
      content: content,
      committer: {
        name: 'Kim Jun Young',
        email: 'juny3738@gamil.com',
      }
    }
    if(update){
      const getContent = await this.getContent(githubStorage);
      data.sha = getContent.data.sha;
    }

    const result = await this.httpService.axiosRef.put(
      `${this.options.endpoint.content}/${githubStorage.path}`,
      data
    )
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
