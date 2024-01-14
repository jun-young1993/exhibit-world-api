import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { LoginUserDto } from "./login-user.dto";

export class CreateUserDto extends LoginUserDto{
	@ApiProperty({example: false, description: 'The user of the '})
	@IsOptional()
	@IsBoolean()
	isRemember?: boolean;
}
