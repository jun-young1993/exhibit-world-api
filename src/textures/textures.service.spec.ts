import { Test, TestingModule } from '@nestjs/testing';
import { TexturesService } from './textures.service';

describe('TexturesService', () => {
  let service: TexturesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TexturesService],
    }).compile();

    service = module.get<TexturesService>(TexturesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
