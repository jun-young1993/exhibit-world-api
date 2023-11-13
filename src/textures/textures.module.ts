import { Module } from '@nestjs/common';
import { TexturesService } from './textures.service';
import { TexturesController } from './textures.controller';

@Module({
  controllers: [TexturesController],
  providers: [TexturesService]
})
export class TexturesModule {}
