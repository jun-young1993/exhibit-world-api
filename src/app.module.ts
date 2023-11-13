import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import appConfig from "./config/app.config";
import databaseConfig from "./config/database.config";
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from "@nestjs/typeorm";
import { TypeOrmConfigService } from "./database/typeorm-config.service";
import { DataSource, DataSourceOptions } from "typeorm";
import { ItemsModule } from './items/items.module';
import { MeshesModule } from './meshes/meshes.module';
import { MaterialsModule } from './materials/materials.module';
import { GeometriesModule } from './geometries/geometries.module';
import { TexturesModule } from './textures/textures.module';


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
    ItemsModule,
    MeshesModule,
    MaterialsModule,
    GeometriesModule,
    TexturesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
