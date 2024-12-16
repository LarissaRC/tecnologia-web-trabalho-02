import { Test, TestingModule } from '@nestjs/testing';
import { LikedSongController } from './liked-song.controller';
import { LikedSongService } from './liked-song.service';

describe('LikedSongController', () => {
  let controller: LikedSongController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LikedSongController],
      providers: [LikedSongService],
    }).compile();

    controller = module.get<LikedSongController>(LikedSongController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
