import { TestBed } from '@angular/core/testing';

import { PrdouctDataService } from './prdouct-data.service';

describe('PrdouctDataService', () => {
  let service: PrdouctDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrdouctDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
