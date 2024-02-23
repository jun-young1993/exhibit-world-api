import { PartialType } from '@nestjs/swagger';
import { CreateGroupMappingDto } from './create-group-mapping.dto';

export class UpdateGroupMappingDto extends PartialType(CreateGroupMappingDto) {}
