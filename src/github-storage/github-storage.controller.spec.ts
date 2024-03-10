import { Test, TestingModule } from '@nestjs/testing';
import { GithubStorageController } from './github-storage.controller';
import { GithubStorageService } from './github-storage.service';

describe('GithubStorageController', () => {
  let controller: GithubStorageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GithubStorageController],
      providers: [GithubStorageService],
    }).compile();

    controller = module.get<GithubStorageController>(GithubStorageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
