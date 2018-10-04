import { TestBed, inject } from '@angular/core/testing';

import { AudioDataService } from './audio-data.service';

describe('AudioDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AudioDataService]
    });
  });

  it('should be created', inject([AudioDataService], (service: AudioDataService) => {
    expect(service).toBeTruthy();
  }));
});
