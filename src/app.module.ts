import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import appConfig from "./config/app.config";
import databaseConfig from "./config/database.config";
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from "@nestjs/typeorm";
import { TypeOrmConfigService } from "./database/typeorm-config.service";
import { DataSource, DataSourceOptions } from "typeorm";
import { MeshesModule } from './meshes/meshes.module';
import { MaterialsModule } from './materials/materials.module';
import { GeometriesModule } from './geometries/geometries.module';
import { ImagesModule } from './images/images.module';
import { GltfModule } from './gltf/gltf.module';
import { GroupsModule } from './groups/groups.module';
import { AssociationsModule } from './associations/associations.module';
import { StorageModule } from './storage/storage.module';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        databaseConfig,
        appConfig,
      ],
      envFilePath:['.env']
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options: DataSourceOptions) => {
        return new DataSource(options).initialize();
      },
    } as TypeOrmModuleAsyncOptions),
    MeshesModule,
    MaterialsModule,
    GeometriesModule,
    ImagesModule,
    GltfModule,
    GroupsModule,
    AssociationsModule,
    StorageModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
