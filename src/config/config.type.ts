import { GithubStorageConfigName } from "./github-storage.config";
import { JwtModuleOptions } from "@nestjs/jwt";
import { GithubConfigName } from "./github.config";

export type AppConfig = {
  nodeEnv: string;
  name: string;
  workingDirectory: string;
  frontendDomain?: string;
  backendDomain: string;
  port: number;
  host: string;
  apiPrefix: string;
};
export type DatabaseConfig = {
  url?: string;
  type?: string;
  host?: string;
  port?: number;
  password?: string;
  name?: string;
  username?: string;
  synchronize?: boolean;
  maxConnections: number;
  sslEnabled?: boolean;
  rejectUnauthorized?: boolean;
  ca?: string;
  key?: string;
  cert?: string;
};

export interface GithubConfig  {
  token: string;
  repo: string;
  owner: string;
  version: string;
  base_url: string;
  endpoint: object;
  committer: {
    name: string,
    email: string
  }
}

export interface MulterConfig {
  image: string;
  gltf: string;
}

export interface JwtConfig extends JwtModuleOptions{}

export interface GithubStorageConfig extends GithubConfig{
  endpoint: {
    content: string
  }
}

export interface GithubBaseConfig extends GithubConfig{
  endpoint: {
    releases: string
  }
}

export type AllConfigType = {
  app: AppConfig;
  database: DatabaseConfig;
  jwt: JwtConfig,
  [GithubStorageConfigName]: GithubStorageConfig;
  [GithubConfigName]: GithubBaseConfig;
  multer: MulterConfig;
};