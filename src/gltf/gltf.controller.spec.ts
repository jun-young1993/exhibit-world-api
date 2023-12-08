import { Test, TestingModule } from '@nestjs/testing';
import { GltfController } from './gltf.controller';
import { GltfService } from './gltf.service';

describe('GltfController', () => {
  let controller: GltfController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GltfController],
      providers: [GltfService],
    }).compile();

    controller = module.get<GltfController>(GltfController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
