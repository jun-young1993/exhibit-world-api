import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Texture } from "./entities/texture.entity";
import { TexturesService } from "./textures.service";
import { ImagesModule } from "../images/images.module";
import { TexturesController } from "./textures.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Texture]), ImagesModule],
    controllers: [TexturesController],
    providers: [TexturesService],
    exports: [TexturesService]
})
export class TexturesModule {}