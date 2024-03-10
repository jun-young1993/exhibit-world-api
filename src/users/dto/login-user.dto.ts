import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class LoginUserDto {
  @ApiProperty({example: 'juny3738@gmail.com', description: 'The user of the email'})
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({example: '1234##', description: 'The user of the password'})
  @IsNotEmpty()
  @IsString()
  password: string;
}