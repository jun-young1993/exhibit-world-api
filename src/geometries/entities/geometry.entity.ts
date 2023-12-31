import { EntityHelper } from "../../utils/entity-helper";
import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Mesh } from "../../meshes/entities/mesh.entity";
import { IsUUID } from "class-validator";
import { BufferAttribute, BufferGeometry, NormalBufferAttributes } from "three";
import * as fs from "fs";

export enum GeometryType {
  BUFFER = 'BufferGeometry',
  BOX = 'BoxGeometry',
  SPHERE = 'SphereGeometry',
  CYLINDER = 'CylinderGeometry',
  // Add other valid THREE.js Geometry types here
}

@Entity({name: 'geometry'})
export class Geometry extends EntityHelper{
  @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: GeometryType,
    default: GeometryType.BOX, // Default to BoxGeometry if not specified
  })
  type: GeometryType;

  @Column('float',{ nullable: true, default: 2, scale: 5 })
  width: number;

  @Column('float',{ nullable: true, default: 2, scale: 5 })
  height: number;

  @Column('float',{ nullable: true, default: 2, scale: 5 })
  depth: number;

  @Column('float',{ nullable: true, default: 2, scale: 5 })
  radius: number;

  @Column({ nullable: true, default: 0 })
  segments: number;

  @OneToOne(
    () => Mesh,
    (mesh) => mesh.geometry
  )
  mesh: Mesh;

  @Column({default: null})
  position?: string | null;

  @Column({default: null})
  normal?: string | null;

  @Column({default: null})
  uv?: string | null;

  attributes?:  {
    position?: BufferAttribute
  };

  setEntity(geometry: BufferGeometry){
    this.id = geometry.uuid;
    // console.log(geometry);

    this.attributes = geometry.attributes;
    this.type = GeometryType[Object.keys(GeometryType)
      .find(key => GeometryType[key as keyof typeof GeometryType] === geometry.type)
    ];
  }

  @BeforeInsert()
 async beforeSave(){

    if(this.attributes){
      const dest = process.env.GEOMETRY_ATTRIBUTE_DEST;

      if(this.attributes.position){

        const vertices = this.attributes.position.array;

        const target = `${dest}/position/${this.id}.bin`;
        console.log()
        try{
          fs.mkdirSync(`${dest}/position`, { recursive: true});
          fs.writeFileSync(target, Buffer.from(vertices.buffer).toString());

        }catch(error){
          console.error(error);
        }


        this.position = target;

      }
    }
 }
}
