import { IsNumber, IsString, IsUrl } from "class-validator";
import { IsStringDate } from "../decorator/is-string-date.decorator";
import { GithubStorageConfig, JwtConfig } from "./config.type";
import { registerAs } from "@nestjs/config";
import validateConfig from "../utils/validate-config";
import { IsStringOrNumber } from "../decorator/is-string-or-number.decorator";



class EnvironmentVariablesValidator {
  @IsString()
  JWT_SECRET: string;

  @IsStringOrNumber()
  JWT_EXPIRES_IN: string | number;
}

export default registerAs<JwtConfig>('jwt', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    secret: process.env.JWT_SECRET,
    signOptions: {
      expiresIn: process.env.JWT_EXPIRES_IN
    },
  }
});