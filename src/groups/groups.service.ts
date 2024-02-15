import { Injectable } from '@nestjs/common';
import { FindOptionsWhere, Repository, UpdateResult } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Group } from "../groups/entities/group.entity";
import { GithubStorage } from "../github-storage/entities/github-storage.entity";
import { User } from "../users/entities/user.entity";
import { UpdateGroupDto } from "./dto/update-group.dto";

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
  ) {}

  /**
   * Find a group by its UUID.
   * @param {string} id The UUID of the group to find.
   * @returns {Promise<Group>} A Promise that resolves to the found Group
   */
  findOne(id: string): Promise<Group>
  {
    return this.groupRepository.findOneBy({
      id: id
    })
  }

  /**
   * Find all groups associated with a user.
   * @param {User} user The user to find groups for.
   * @returns {Promise<Group[]>} A promise that resolves to an array of groups.
   */
  findAll(user: User): Promise<Group[]>
  {
    return this.groupRepository.find({
     where: {
       user: {
         id: user.id
       }
     }
    });
  }

  /**
   * Create a new group. 
   * @param {GithubStorage} githubStorage 
   * @param {User} user The user to find groups for.
   * @returns {Promise<Group>} A promise that resolves to the created group.
   */
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

  /**
   * Patch a group.
   * @param {string} uuid The Group UUID
   * @param {UpdateGroupDto} group The Group.
   * @returns {Promise<Group>} A promise that resolves to the updated group.
   */
  async patch(uuid: string, updateGroupDto: UpdateGroupDto): Promise<UpdateResult>
  {
    return await this.groupRepository.update(uuid,updateGroupDto);

  }


}
