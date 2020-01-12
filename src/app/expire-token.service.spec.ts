import { TestBed } from '@angular/core/testing';

import { ExpireTokenService } from './expire-token.service';

describe('ExpireTokenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExpireTokenService = TestBed.get(ExpireTokenService);
    expect(service).toBeTruthy();
  });
});
