import { TestBed } from '@angular/core/testing';

import { AccessLoginGuard } from './access-login.guard';

describe('AccessLoginGuard', () => {
  let guard: AccessLoginGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AccessLoginGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
