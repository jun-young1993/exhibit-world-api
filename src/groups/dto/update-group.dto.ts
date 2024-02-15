import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateGroupDto {
  @ApiProperty({example: 'the my test object', description: 'The Group Name'})
  @IsString()
  @IsNotEmpty()
  name: string
}
