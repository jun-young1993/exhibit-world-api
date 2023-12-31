import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { EntityHelper } from "../../utils/entity-helper";
import { ApiProperty } from "@nestjs/swagger";
import { Mesh } from "../../meshes/entities/mesh.entity";
import { GLTF } from "node-three-gltf";
import { Mesh as ThreeMesh, Object3D as ThreeObject3D } from "three";


@Entity({name: 'group'})
export class Group extends EntityHelper{
  @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('float',{scale: 5, default: 0})
  positionX: number;

  @Column('float',{scale: 5, default: 0})
  positionY: number;

  @Column('float',{scale: 5, default: 0})
  positionZ: number;

  @Column('float',{scale: 5, default: 0})
  rotationX: number;

  @Column('float',{scale: 5, default: 0})
  rotationY: number;

  @Column('float',{scale: 5, default: 0})
  rotationZ: number;

  @Column('float',{scale: 5, default: 0})
  quaternionX: number;

  @Column('float',{scale: 5, default: 0})
  quaternionY: number;

  @Column('float',{scale: 5, default: 0})
  quaternionZ: number;

  @Column('float',{scale: 5, default: 0})
  quaternionW: number;

  @Column('float',{scale: 5, default: 2})
  scaleX: number;

  @Column('float',{scale: 5, default: 2})
  scaleY: number;

  @Column('float',{scale: 5, default: 2})
  scaleZ: number;

  @OneToMany(
    () => Mesh,
    (mesh) => mesh.group,
    { eager: true, cascade: true, onDelete: "CASCADE" }
  )
  mesh: Mesh[]

  setEntity(group: GLTF['scene']){
    this.id = group.uuid;

    this.positionX = group.position.x;
    this.positionY = group.position.y;
    this.positionZ = group.position.z;

    this.rotationX = group.rotation.x;
    this.rotationY = group.rotation.y;
    this.rotationZ = group.rotation.z;

    this.quaternionX = group.quaternion.x;
    this.quaternionY = group.quaternion.y;
    this.quaternionZ = group.quaternion.z;
    this.quaternionW = group.quaternion.w;

    this.scaleX = group.scale.x;
    this.scaleY = group.scale.y;
    this.scaleZ = group.scale.z;



    this.mesh = group.children.map((object3D) => {
      if(object3D instanceof ThreeMesh) {
        const mesh = new Mesh();
        mesh.setEntity(object3D);
        return mesh;
      }else if(object3D instanceof ThreeObject3D){
        throw new Error('object 3d 개발전')
      }
      throw new Error('object 3d 개발전')

    })

  }
}
