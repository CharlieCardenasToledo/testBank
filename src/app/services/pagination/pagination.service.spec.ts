import { TestBed } from '@angular/core/testing';
import { PaginationService } from './pagination.service';
import { FinancialProduct } from 'src/app/core/models/product.model';

describe('PaginationService', () => {
  let service: PaginationService;
  let mockProducts: FinancialProduct[];

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaginationService);

    mockProducts = Array.from({ length: 20 }, (_, index) => ({
      id: `product-${index + 1}`
    }) as FinancialProduct);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should paginate products correctly', () => {
    const paginatedProducts = service.paginateProducts(mockProducts);
    expect(paginatedProducts.length).toBe(5);
    expect(paginatedProducts[0].id).toEqual('product-1');
    expect(paginatedProducts[4].id).toEqual('product-5');
  });

  it('should calculate total pages correctly', () => {
    service.setItemsPerPage(5, mockProducts.length);
    expect(service.getTotalPages()).toBe(4);
  });

  it('should handle currentPage correctly when setting items per page', () => {
    service.setItemsPerPage(10, mockProducts.length); 
    expect(service.getCurrentPage()).toBe(1);
  });

  it('should update currentPage correctly', () => {
    service.setCurrentPage(2);
    expect(service.getCurrentPage()).toBe(2);
  });

  it('should adjust currentPage if beyond totalPages after setting itemsPerPage', () => {
    service.setItemsPerPage(5, 10);
    service.setCurrentPage(3); 
    service.setItemsPerPage(5, 10); 
    expect(service.getCurrentPage()).toBe(2); 
  });

  it('returns correct page content when changing pages', () => {
    service.setItemsPerPage(5, mockProducts.length); 
    service.setCurrentPage(2); 
    const pageProducts = service.paginateProducts(mockProducts);
    expect(pageProducts[0].id).toEqual('product-6');
    expect(pageProducts.length).toEqual(5);
  });

});
