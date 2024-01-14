import { GithubStorageConfigName } from "./github-storage.config";
import { JwtModuleOptions } from "@nestjs/jwt";

export type AppConfig = {
  nodeEnv: string;
  name: string;
  workingDirectory: string;
  frontendDomain?: string;
  backendDomain: string;
  port: number;
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
  endpoint: {
    content: string
  }
}

export interface JwtConfig extends JwtModuleOptions{}

export interface GithubStorageConfig extends GithubConfig{}

export type AllConfigType = {
  app: AppConfig;
  database: DatabaseConfig;
  jwt: JwtConfig,
  [GithubStorageConfigName]: GithubStorageConfig;
};