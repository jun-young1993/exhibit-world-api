import { Injectable } from '@nestjs/common';
import { CreateGroupMappingDto } from './dto/create-group-mapping.dto';
import { UpdateGroupMappingDto } from './dto/update-group-mapping.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupMapping } from './entities/group-mapping.entity';
import { Repository, UpdateResult } from "typeorm";
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class GroupMappingService {
  constructor(
    @InjectRepository(GroupMapping)
    private readonly groupMappingRepository: Repository<GroupMapping>
  ){}
  create(createGroupMappingDto: CreateGroupMappingDto, user: User) {
    return this.groupMappingRepository.save(
      this.groupMappingRepository.create({
          ...createGroupMappingDto,
          user: user
        })
    )
  }

  /**
   * Find all groupMappings associated with a user
   * 
   * @param {User} user The user to find GroupMapping for.
   * @returns {Promise<GroupMapping> | []} A promise that resolves to an array of groupMappings
   */
  findAll(user: User): Promise<GroupMapping[] | []>
  {
    return this.groupMappingRepository.find({
      where: {
        user: {
          id: user.id
        }
      }
    })
  }

/**
   * Find a group by its UUID.
   * @param {string} id The UUID of the group to find.
   * @returns {Promise<GroupMapping>} A Promise that resolves to the found Group
   */
  findOne(id: string): Promise<GroupMapping> {
    return this.groupMappingRepository.findOneBy({
      id: id
    })
  }

  /**
   * Patch a group mapping.
   * @param {GroupMapping['id']} uuid The Group Mapping UUID
   * @param {UpdateGroupMappingDto} updateGroupMappingDto The Group Mapping.
   *
   * @returns {Promise<GroupMapping>} A promise that resolve to the updated group mapping.
   */
  update(uuid: string, updateGroupMappingDto: UpdateGroupMappingDto): Promise<UpdateResult>
  {
    return this.groupMappingRepository.update(uuid, updateGroupMappingDto);
  }

  remove(id: number) {
    return `This action removes a #${id} groupMapping`;
  }
}
