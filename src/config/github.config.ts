import { IsString, IsUrl } from "class-validator";
import { IsStringDate } from "../decorator/is-string-date.decorator";
import { GithubBaseConfig, GithubConfig, GithubStorageConfig } from "./config.type";
import { registerAs } from "@nestjs/config";
import validateConfig from "../utils/validate-config";

export const GithubConfigName = 'github';

class EnvironmentVariablesValidator {
  @IsString()
  GIT_HUB_TOKE: string;

  @IsString()
  GIT_HUB_REPO: string;

  @IsString()
  GIT_HUB_OWNER: string;

  @IsString()
  @IsStringDate()
  GIT_HUB_API_VERSION: string;

  @IsUrl()
  GIT_HUB_API_BASE_URL: string;

  @IsString()
  GIT_HUB_EMAIL: string;

  @IsString()
  GIT_HUB_NAME: string;
}

export default registerAs<GithubBaseConfig>(GithubConfigName, () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    token: process.env.GIT_HUB_TOKE,
    repo: process.env.GIT_HUB_REPO,
    owner: process.env.GIT_HUB_OWNER,
    version: process.env.GIT_HUB_API_VERSION,
    base_url: process.env.GIT_HUB_API_BASE_URL,
    committer: {
      email: process.env.GIT_HUB_EMAIL,
      name: process.env.GIT_HUB_NAME,
    },
    endpoint:{
      releases: `repos/${process.env.GIT_HUB_OWNER}/${process.env.GIT_HUB_REPO}/releases`
    }
  }
});