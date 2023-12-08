import { PartialType } from '@nestjs/swagger';
import { CreateGltfDto } from './create-gltf.dto';

export class UpdateGltfDto extends PartialType(CreateGltfDto) {}
