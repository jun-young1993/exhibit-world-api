import { Test, TestingModule } from '@nestjs/testing';
import { GltfService } from './gltf.service';

describe('GltfService', () => {
  let service: GltfService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GltfService],
    }).compile();

    service = module.get<GltfService>(GltfService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
