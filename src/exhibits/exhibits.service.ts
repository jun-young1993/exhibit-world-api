import { Injectable } from '@nestjs/common';
import { CreateExhibitDto } from './dto/create-exhibit.dto';
import { UpdateExhibitDto } from './dto/update-exhibit.dto';
import { Repository } from "typeorm";
import { Exhibit } from "./entities/exhibit.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { GithubStorage } from "../github-storage/entities/github-storage.entity";

@Injectable()
export class ExhibitsService {
  constructor(
    @InjectRepository(Exhibit)
    private readonly exhibitRepository: Repository<Exhibit>
  ) {
  }
  async create(githubStorage: GithubStorage): Promise<Exhibit>
  {
    return await this.exhibitRepository.save(
      this.exhibitRepository.create({
        githubStorage: githubStorage
      })
    )
  }


}
