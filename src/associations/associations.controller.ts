import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AssociationsService } from './associations.service';
import { CreateAssociationDto } from './dto/create-association.dto';
import { UpdateAssociationDto } from './dto/update-association.dto';
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Associations')
@Controller({
  path: 'associations',
  version: 'v1'
})
export class AssociationsController {
  constructor(private readonly associationsService: AssociationsService) {}
}
