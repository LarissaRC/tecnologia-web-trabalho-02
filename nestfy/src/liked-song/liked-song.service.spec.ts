import { Test, TestingModule } from '@nestjs/testing';
import { LikedSongService } from './liked-song.service';

describe('LikedSongService', () => {
  let service: LikedSongService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LikedSongService],
    }).compile();

    service = module.get<LikedSongService>(LikedSongService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
