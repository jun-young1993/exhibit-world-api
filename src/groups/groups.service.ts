import { Injectable } from '@nestjs/common';
import { FindOptionsWhere, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Group } from "../groups/entities/group.entity";
import { GithubStorage } from "../github-storage/entities/github-storage.entity";
import { User } from "../users/entities/user.entity";

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

  findAll(user: User): Promise<Group[]>
  {
    console.log("=>(groups.service.ts:25) user", user);
    return this.groupRepository.find({
     where: {
       user: {
         id: user.id
       }
     }
    });
  }

  async create(
    githubStorage: GithubStorage,
    user: User
  ): Promise<Group>
  {
    return await this.groupRepository.save(
      this.groupRepository.create({
        githubStorage: githubStorage,
        user: user
      })
    );

  };


}
