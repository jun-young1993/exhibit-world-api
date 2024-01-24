import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert } from "typeorm";
import * as bcrypt from 'bcrypt';
import { EntityHelper } from "../../utils/entity-helper";

@Entity({name: 'user'})
export class User extends EntityHelper{
	@ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	email: string;

	@Column()
	password: string;

	@Column({ default: false })
	isRemember: boolean;

	@Column({ default: true })
	isActive: boolean;

	@Column({ nullable:true })
	loginIp: string;

	@BeforeInsert()
	async hashPassword(): Promise<void> {
	  const salt = await bcrypt.genSalt();
	  this.password = await bcrypt.hash(this.password, salt);
	}


      
}
