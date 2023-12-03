import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Image } from "../../images/entities/image.entity";
import { CreateGeometryDto } from "../../geometries/dto/create-geometry.dto";

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

  @ApiProperty({ type: Image, description: 'Image data' })
  image: Image
}
