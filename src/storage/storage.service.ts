import { Injectable } from '@nestjs/common';
import { CreateStorageDto } from './dto/create-storage.dto';
import { UpdateStorageDto } from './dto/update-storage.dto';

@Injectable()
export class StorageService {
  create(createStorageDto: CreateStorageDto) {

  }

}
