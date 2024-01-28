import { IsString, IsUrl } from "class-validator";
import { IsStringDate } from "../decorator/is-string-date.decorator";
import { GithubStorageConfig } from "./config.type";
import { registerAs } from "@nestjs/config";
import validateConfig from "../utils/validate-config";

export const GithubStorageConfigName = 'githubStorage';

class EnvironmentVariablesValidator {
  @IsString()
  GIT_HUB_STORAGE_TOKE: string;

  @IsString()
  GIT_HUB_STORAGE_REPO: string;

  @IsString()
  GIT_HUB_STORAGE_OWNER: string;

  @IsString()
  @IsStringDate()
  GIT_HUB_STORAGE_API_VERSION: string;

  @IsUrl()
  GIT_HUB_API_BASE_URL: string;

  @IsString()
  GIT_HUB_STORAGE_EMAIL: string;

  @IsString()
  GIT_HUB_STORAGE_NAME: string;
}

export default registerAs<GithubStorageConfig>(GithubStorageConfigName, () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    token: process.env.GIT_HUB_STORAGE_TOKE,
    repo: process.env.GIT_HUB_STORAGE_REPO,
    owner: process.env.GIT_HUB_STORAGE_OWNER,
    version: process.env.GIT_HUB_STORAGE_API_VERSION,
    base_url: process.env.GIT_HUB_API_BASE_URL,
    committer: {
      email: process.env.GIT_HUB_STORAGE_EMAIL,
      name: process.env.GIT_HUB_STORAGE_NAME,
    },
    endpoint:{
      content: `repos/${process.env.GIT_HUB_STORAGE_OWNER}/${process.env.GIT_HUB_STORAGE_REPO}/contents`
    }
  }
});