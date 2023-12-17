import { Injectable } from '@nestjs/common';
import { Mesh } from "../meshes/entities/mesh.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Geometry } from "../geometries/entities/geometry.entity";
import { Material } from "../materials/entities/material.entity";
import { Group } from "../groups/entities/group.entity";
import { CreateGroupDto } from "../groups/dto/create-group.dto";
import { Association } from "../associations/entities/association.entity";

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Mesh)
    private readonly meshRepository: Repository<Mesh>,
    @InjectRepository(Geometry)
    private readonly geometryRepository: Repository<Geometry>,
    @InjectRepository(Material)
    private readonly materialRepository: Repository<Material>,
    @InjectRepository(Association)
    private readonly associationRepository: Repository<Association>,
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>
  ) {}

  findOne(id: string): Promise<Group>
  {
    return this.groupRepository.findOneBy({
      id: id
    })
  }

  findAll(): Promise<Group[]>
  {
    return this.groupRepository.find();
  }

  async create(createGroupDto: CreateGroupDto): Promise<Group>
  {
    const group = await this.groupRepository.save(
      this.groupRepository.create()
    );

    const geometry = await this.geometryRepository.save(createGroupDto.geometry);

    const association = await this.associationRepository.save({});
    createGroupDto.material.association = association;
    await this.materialRepository.save(createGroupDto.material)

    const createMeshDto = createGroupDto.mesh;
    createMeshDto.geometry = geometry;
    createMeshDto.association = association;
    createMeshDto.group = group;
    const mesh = await this.meshRepository.save(createMeshDto);

    await this.meshRepository.create(mesh);

    return this.findOne(group.id);
  };

  async createDefault(): Promise<Group>
  {
    const group = new Group();
    const savedGroup = await group.save();

    const geometry = new Geometry();
    const savedGeometry = await geometry.save();

    const association = new Association();
    const savedAssociation = await association.save();

    const materialCount = 6;
    for(let index=0; index<materialCount; index++){
      const material = new Material();
      material.association = savedAssociation;
      await material.save();
    }

    const mesh = new Mesh();
    mesh.group = savedGroup;
    mesh.association = savedAssociation;
    mesh.geometry = savedGeometry;
    await mesh.save();

    return this.findOne(savedGroup.id);
  }
}
