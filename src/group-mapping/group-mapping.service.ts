import { Injectable } from '@nestjs/common';
import { CreateGroupMappingDto } from './dto/create-group-mapping.dto';
import { UpdateGroupMappingDto } from './dto/update-group-mapping.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupMapping } from './entities/group-mapping.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class GroupMappingService {
  constructor(
    @InjectRepository(GroupMapping)
    private readonly groupMappingRepository: Repository<GroupMapping>
  ){}
  create(createGroupMappingDto: CreateGroupMappingDto) {
    return 'This action adds a new groupMapping';
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

  findOne(id: number) {
    return `This action returns a #${id} groupMapping`;
  }

  update(id: number, updateGroupMappingDto: UpdateGroupMappingDto) {
    return `This action updates a #${id} groupMapping`;
  }

  remove(id: number) {
    return `This action removes a #${id} groupMapping`;
  }
}