import { Injectable } from '@nestjs/common';
import { CreateExhibitDto } from './dto/create-exhibit.dto';
import { UpdateExhibitDto } from './dto/update-exhibit.dto';
import { FindManyOptions, Repository, UpdateResult } from "typeorm";
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

  async findAll( options?: FindManyOptions<Exhibit>): Promise<Exhibit[] | []> {
    return await this.exhibitRepository.find(options);
  }

  findOne(uuid: string): Promise<Exhibit>
  {
    return this.exhibitRepository.findOneBy({
      id: uuid
    });
  }

  /**
   * Patch a exhibit.
   * @param {Exhibit['id']} uuid The Exhibit UUID
   * @param {UpdateExhibitDto} updateExhibitDto The Exhibit.
   *
   * @returns {Promise<Exhibit>} A promise that resolve to the updated exhibit.
   */
  update(uuid: Exhibit['id'], updateExhibitDto: UpdateExhibitDto): Promise<UpdateResult>
  {
    return this.exhibitRepository.update(uuid, updateExhibitDto);
  }


}
