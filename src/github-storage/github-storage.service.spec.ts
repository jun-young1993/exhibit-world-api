import { Test, TestingModule } from '@nestjs/testing';
import { GithubStorageService } from './github-storage.service';

describe('GithubStorageService', () => {
  let service: GithubStorageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GithubStorageService],
    }).compile();

    service = module.get<GithubStorageService>(GithubStorageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
