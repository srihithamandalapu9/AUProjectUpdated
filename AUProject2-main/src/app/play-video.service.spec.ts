import { TestBed } from '@angular/core/testing';

import { PlayVideoService } from './play-video.service';

describe('PlayVideoService', () => {
  let service: PlayVideoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayVideoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
