import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ProductApiService } from './product-api.service';

describe('ProductApiService', () => {
  let service: ProductApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(ProductApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
