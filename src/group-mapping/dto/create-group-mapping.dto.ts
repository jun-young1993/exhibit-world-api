import { IsOptional, IsString } from "class-validator";

export class CreateGroupMappingDto {

  @IsOptional()
  @IsString()
  name?: string;
}
