import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert, OneToMany } from "typeorm";
import * as bcrypt from 'bcrypt';
import { EntityHelper } from "../../utils/entity-helper";
import { Group } from "src/groups/entities/group.entity";
import { GroupMapping } from "src/group-mapping/entities/group-mapping.entity";
import { Exhibit } from "../../exhibits/entities/exhibit.entity";

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

	@OneToMany(
		() => GroupMapping,
		(groupMapping) => groupMapping.user
	)
	groupMapping: GroupMapping[]

	@OneToMany(
		() => Exhibit,
		(exhibit) => exhibit.user
	)
	exhibit: Exhibit[]

	@BeforeInsert()
	async hashPassword(): Promise<void> {
	  const salt = await bcrypt.genSalt();
	  this.password = await bcrypt.hash(this.password, salt);
	}
}
