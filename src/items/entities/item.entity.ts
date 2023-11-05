import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';
import { EntityHelper } from "../../utils/entity-helper";

@Entity({name: 'item'})
export class Item extends EntityHelper{
  @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('double precision') // width, height, depth를 부동 소수점 숫자로 지정
  width: number;

  @Column('double precision')
  height: number;

  @Column('double precision')
  depth: number;

  @Column('double precision') // x, y, z 좌표를 부동 소수점 숫자로 지정
  x: number;

  @Column('double precision')
  y: number;

  @Column('double precision')
  z: number;
}
