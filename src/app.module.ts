import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import appConfig from "./config/app.config";
import databaseConfig from "./config/database.config";
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from "@nestjs/typeorm";
import { TypeOrmConfigService } from "./database/typeorm-config.service";
import { DataSource, DataSourceOptions } from "typeorm";
import { GroupsModule } from './groups/groups.module';
import { GithubStorageModule } from './github-storage/github-storage.module';
import { GithubModule } from './github/github.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ExhibitsModule } from './exhibits/exhibits.module';
import githubStorageConfig from "./config/github-storage.config";
import JwtConfig from "./config/jwt.config";
import MulterConfig from "./config/multer.config";
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        databaseConfig,
        appConfig,
        githubStorageConfig,
        JwtConfig,
        MulterConfig
      ],
      envFilePath:['.env']
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options: DataSourceOptions) => {
        return new DataSource(options).initialize();
      },
    } as TypeOrmModuleAsyncOptions),
    GroupsModule,
    GithubStorageModule,
    GithubModule,
    UsersModule,
    AuthModule,
    ExhibitsModule
  ],
  controllers: [AppController],
  providers: [
    AppService
  ],
})
export class AppModule {}
