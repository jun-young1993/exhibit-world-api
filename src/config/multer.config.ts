import { IsString} from "class-validator";
import { registerAs } from "@nestjs/config";
import validateConfig from "../utils/validate-config";
import { MulterConfig } from "./config.type";

class EnvironmentVariablesValidator {
  @IsString()
  IMAGE_MULTER_DEST: string;

  @IsString()
  GLTF_MULTER_DEST: string;
}

export default registerAs<MulterConfig>('multer', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    image: process.env.IMAGE_MULTER_DEST,
    gltf: process.env.GLTF_MULTER_DEST
  }
});