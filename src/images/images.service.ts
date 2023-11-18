import { Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { ConfigService } from "@nestjs/config";
import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, Repository } from "typeorm";
import { Image, ImageType } from "./entities/image.entity";

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>
  ) {
  }
  create(createImageDto: CreateImageDto) {
    console.log(createImageDto);
    return this.imageRepository.save(
      this.imageRepository.create(
        createImageDto
      )
    )
  }

  findByPurpose(purpose: ImageType) {
    return this.imageRepository.find({
      where: {
        purpose: purpose
      }
    })
  }

  findAll() {
    return `This action returns all images`;
  }

  findOne(id: string): Promise<Image>
  {
    return this.imageRepository.findOneBy({
      id: id
    })
  }

  update(id: number, updateImageDto: UpdateImageDto) {
    return `This action updates a #${id} image`;
  }

  remove(id: number) {
    return `This action removes a #${id} image`;
  }

}
