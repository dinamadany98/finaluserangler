import { TestBed } from '@angular/core/testing';

import { WhishlisService } from './whishlis.service';

describe('WhishlisService', () => {
  let service: WhishlisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WhishlisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
