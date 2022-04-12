import { TestBed } from '@angular/core/testing';

import { IProductService } from './iproduct.service';

describe('IProductService', () => {
  let service: IProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
