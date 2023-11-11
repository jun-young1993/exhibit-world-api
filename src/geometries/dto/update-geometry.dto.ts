import { PartialType } from '@nestjs/swagger';
import { CreateGeometryDto } from './create-geometry.dto';

export class UpdateGeometryDto extends PartialType(CreateGeometryDto) {}
