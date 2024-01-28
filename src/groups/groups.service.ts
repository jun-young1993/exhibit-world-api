import { Injectable } from '@nestjs/common';
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Group } from "../groups/entities/group.entity";
import { GithubStorage } from "../github-storage/entities/github-storage.entity";

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
  ) {}

  findOne(id: string): Promise<Group>
  {
    return this.groupRepository.findOneBy({
      id: id
    })
  }

  findAll(): Promise<Group[]>
  {
    return this.groupRepository.find();
  }

  async create(
    githubStorage: GithubStorage
  ): Promise<Group>
  {
    return await this.groupRepository.save(
      this.groupRepository.create({
        githubStorage: githubStorage
      })
    );

  };


}
