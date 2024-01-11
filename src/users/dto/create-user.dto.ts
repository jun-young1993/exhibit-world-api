import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
	@ApiProperty({example: 'admin@gmail.com', description: 'The user of the email'})
	@IsNotEmpty()
	@IsString()
	email: string;

	@ApiProperty({example: '1234##', description: 'The user of the password'})
	@IsNotEmpty()
	@IsString()
	password: string;

	@ApiProperty({example: false, description: 'The user of the '})
	@IsOptional()
	@IsBoolean()
	isRemember?: boolean;
}
