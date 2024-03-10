import { Module } from '@nestjs/common';
import { ExhibitsService } from './exhibits.service';
import { ExhibitsController } from './exhibits.controller';
import { GithubStorageModule } from "../github-storage/github-storage.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Exhibit } from "./entities/exhibit.entity";

@Module({
  imports: [GithubStorageModule,TypeOrmModule.forFeature([Exhibit])],
  controllers: [ExhibitsController],
  providers: [ExhibitsService]
})
export class ExhibitsModule {}
