import { Test, TestingModule } from '@nestjs/testing';
import { GroupMappingService } from './group-mapping.service';

describe('GroupMappingService', () => {
  let service: GroupMappingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroupMappingService],
    }).compile();

    service = module.get<GroupMappingService>(GroupMappingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
