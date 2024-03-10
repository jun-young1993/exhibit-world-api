import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
	@ApiProperty({example: true, description: 'The user of the '})
	@IsOptional()
	@IsBoolean()
	isActive?: string;
}
