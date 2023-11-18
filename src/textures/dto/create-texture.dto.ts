import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Image } from "../../images/entities/image.entity";

export class CreateTextureDto {
  @ApiProperty({example: 1001, description: 'The wrapT of the texture'})
  @IsNotEmpty()
  @IsNumber()
  wrapT: number;

  @ApiProperty({example: 1001, description: 'The wrapS of the texture'})
  @IsNotEmpty()
  @IsNumber()
  wrapS: number;

  @ApiProperty({example: 1, description: 'The repeatX of the texture'})
  @IsNotEmpty()
  @IsNumber()
  repeatX: number;

  @ApiProperty({example: 1, description: 'The repeatY of the texture'})
  @IsNotEmpty()
  @IsNumber()
  repeatY: number;

  @ApiProperty({example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae', description: 'image item id'})
  @IsString()
  uuid: string;

  image: Image
}
