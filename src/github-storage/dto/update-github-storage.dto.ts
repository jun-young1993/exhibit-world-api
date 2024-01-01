import { PartialType } from '@nestjs/swagger';
import { CreateGithubStorageDto } from './create-github-storage.dto';

export class UpdateGithubStorageDto extends PartialType(CreateGithubStorageDto) {}
