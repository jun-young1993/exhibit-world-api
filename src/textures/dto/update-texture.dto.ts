import { PartialType } from '@nestjs/swagger';
import { CreateTextureDto } from './create-texture.dto';

export class UpdateTextureDto extends PartialType(CreateTextureDto) {}
