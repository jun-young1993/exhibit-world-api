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
import { GroupsService } from "../groups/groups.service";
import { Group } from "../groups/entities/group.entity";

@Injectable()
export class GithubStorageService {
  private options: GithubStorageConfig;
  constructor(
    private readonly httpService: HttpService,
    private readonly githubService: GithubService,
    private readonly configService: ConfigService,
    private readonly groupsService: GroupsService,
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

  async upload(file: Express.Multer.File): Promise<Group>
  {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDay();
    const target = `${year}/${month}/${day}/${file.filename}`;
    const content = fs.readFileSync(file.path, 'base64');

    const group = await this.groupsService.createDefault();

    await this.githubStorageRepository.save(
      this.githubStorageRepository.create({
        path: target,
        filename: file.filename,
        group: group
      })
    )
    await this.httpService.axiosRef.put(
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

    return this.groupsService.findOne(group.id);

  }
}
