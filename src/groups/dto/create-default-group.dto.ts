import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateDefaultGroupDto {
  @ApiProperty({example: 0, description: 'The group of the position x'})
  @IsNotEmpty()
  @IsNumber()
  positionX: number;

  @ApiProperty({example: 0, description: 'The group of the position y'})
  @IsNotEmpty()
  @IsNumber()
  positionY: number;

  @ApiProperty({example: 0, description: 'The group of the position z'})
  @IsNotEmpty()
  @IsNumber()
  positionZ: number;

  @ApiProperty({example: 0, description: 'The group of the rotation x'})
  @IsNotEmpty()
  @IsNumber()
  rotationX: number;

  @ApiProperty({example: 0, description: 'The group of the rotation y'})
  @IsNotEmpty()
  @IsNumber()
  rotationY: number;

  @ApiProperty({example: 0, description: 'The group of the rotation z'})
  @IsNotEmpty()
  @IsNumber()
  rotationZ: number;

  @ApiProperty({example: 0, description: 'The group of the quaternion x'})
  @IsNotEmpty()
  @IsNumber()
  quaternionX: number;

  @ApiProperty({example: 0, description: 'The group of the quaternion y'})
  @IsNotEmpty()
  @IsNumber()
  quaternionY: number;

  @ApiProperty({example: 0, description: 'The group of the quaternion z'})
  @IsNotEmpty()
  @IsNumber()
  quaternionZ: number;

  @ApiProperty({example: 0, description: 'The group of the quaternion z'})
  @IsNotEmpty()
  @IsNumber()
  quaternionW: number;

  @ApiProperty({example: 0, description: 'The group of the scale x'})
  @IsNotEmpty()
  @IsNumber()
  scaleX: number;

  @ApiProperty({example: 0, description: 'The group of the scale y'})
  @IsNotEmpty()
  @IsNumber()
  scaleY: number;

  @ApiProperty({example: 0, description: 'The group of the scale z'})
  @IsNotEmpty()
  @IsNumber()
  scaleZ: number;
}