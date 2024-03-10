import { Test, TestingModule } from '@nestjs/testing';
import { ExhibitsController } from './exhibits.controller';
import { ExhibitsService } from './exhibits.service';

describe('ExhibitsController', () => {
  let controller: ExhibitsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExhibitsController],
      providers: [ExhibitsService],
    }).compile();

    controller = module.get<ExhibitsController>(ExhibitsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
