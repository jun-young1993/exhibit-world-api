import { InjectRepository } from "@nestjs/typeorm";
import { Texture } from "./entities/texture.entity";
import { Repository } from "typeorm";
import { CreateTextureDto } from "./dto/create-texture.dto";
import { ImagesService } from "../images/images.service";
import { UpdateTextureDto } from "./dto/update-texture.dto";

export class TexturesService {
  constructor(
    @InjectRepository(Texture)
    private readonly textureRepository: Repository<Texture>,
    private readonly imagesService: ImagesService
  ) {
  }

  async create(createTextureDto: CreateTextureDto) {
    const image = await this.imagesService.findOne(createTextureDto.image.id);

    createTextureDto.image = image
    const texture = await this.textureRepository.save(
      this.textureRepository.create(createTextureDto)
    )

    return texture;
  }

  async update(id: string, updateTextureDto: UpdateTextureDto) {
    if (updateTextureDto.image) {
      const image = await this.imagesService.findOne(updateTextureDto.image.id);
      updateTextureDto.image = image;
    }

    return this.textureRepository.update(id, updateTextureDto);


  }
}