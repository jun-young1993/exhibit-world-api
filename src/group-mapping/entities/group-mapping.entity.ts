import { ApiProperty } from "@nestjs/swagger";
import { Group } from "src/groups/entities/group.entity";
import { User } from "src/users/entities/user.entity";
import { EntityHelper } from "src/utils/entity-helper";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'group_mapping'})
export class GroupMapping extends EntityHelper{
	@ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column({
		default: 'no name'
	})
	name: string;

	@OneToMany(
		() => Group,
		(group) => group.groupMapping,
	)
	group: Group[]

	@ManyToOne(
		() => User,
		(user) => user.groupMapping,
		{nullable: false}
	)
	@JoinColumn()
	user: User

	@CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
	createdAt: Date;
}
