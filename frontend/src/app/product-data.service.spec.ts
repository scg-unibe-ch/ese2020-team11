import { TestBed } from '@angular/core/testing';

import { ProductsDataService } from './product-data.service';

describe('PrdouctDataService', () => {
  let service: ProductsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
