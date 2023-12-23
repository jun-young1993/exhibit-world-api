import { PartialType } from '@nestjs/swagger';
import { CreateGroupDto } from './create-group.dto';
import { CreateDefaultGroupDto } from "./create-default-group.dto";

export class UpdateGroupDto extends PartialType(CreateDefaultGroupDto) {}
