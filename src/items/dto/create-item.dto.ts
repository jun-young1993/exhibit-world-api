import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsNumberOptions } from "class-validator";



export class CreateItemDto {
  @ApiProperty({ example: 0, description: 'The width of the item' })
  @IsNotEmpty()
  @IsNumber()
  width: number;

  @ApiProperty({ example: 0, description: 'The height of the item' })
  @IsNotEmpty()
  @IsNumber()
  height: number;

  @ApiProperty({ example: 0, description: 'The depth of the item' })
  @IsNotEmpty()
  @IsNumber()
  depth: number;

  @ApiProperty({ example: 0, description: 'The X coordinate of the item' })
  @IsNotEmpty()
  @IsNumber()
  x: number;

  @ApiProperty({ example: 0, description: 'The Y coordinate of the item' })
  @IsNotEmpty()
  @IsNumber()
  y: number;

  @ApiProperty({ example: 0, description: 'The Z coordinate of the item' })
  @IsNotEmpty()
  @IsNumber()
  z: number;
}
