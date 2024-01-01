import { Injectable } from '@nestjs/common';
import { CreateGithubStorageDto } from './dto/create-github-storage.dto';
import { UpdateGithubStorageDto } from './dto/update-github-storage.dto';
import { GithubConfigType, GithubService } from "../github/github.service";
import { ConfigService } from "@nestjs/config";
import { HttpService } from "@nestjs/axios";
import { GithubStorageConfig } from "../config/config.type";
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
    private readonly configService: ConfigService,
    @InjectRepository(GithubStorage)
    private readonly githubStorageRepository: Repository<GithubStorage>
  ) {
    this.options = this.configService.get(GithubConfigType.STORAGE);
  }

  async test() {
    return await this.httpService.axiosRef.get(
      `${this.options.endpoint.content}/2024/1/1/010c8c4d-39e9-4a14-a447-02715c37f745.glb`
    )
  }

  findAll() {
    return this.githubStorageRepository.find();
  }

  async upload(file: Express.Multer.File) {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDay();
    const target = `${year}/${month}/${day}/${file.filename}`;
    const content = fs.readFileSync(file.path, 'base64');
    await this.githubStorageRepository.save(
      this.githubStorageRepository.create({
        path: target,
        filename: file.filename
      })
    )
    return this.httpService.axiosRef.put(
      `${this.options.endpoint.content}/${target}`,
      {
        message: 'my commit message',
        content: content,
        committer: {
          name: 'Kim Jun Young',
          email: 'juny3738@gamil.com',
        }
      }
    )
  }
}
