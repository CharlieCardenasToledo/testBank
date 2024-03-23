import { TestBed } from '@angular/core/testing';
import { ProductFilterService } from './product-filter.service';
import { FinancialProduct } from 'src/app/core/models/product.model';

describe('ProductFilterService', () => {
  let service: ProductFilterService;
  let mockProducts: FinancialProduct[];

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductFilterService);

    mockProducts = [
      {
        id: '1',
        name: 'Savings Account',
        description: 'A secure place to keep your money with interest.',
        logo: 'savings-logo.png',
        date_release: new Date('2020-01-01'),
        date_revision: new Date('2020-06-01')
      },
      {
        id: '2',
        name: 'Checking Account',
        description: 'Easy access to your funds with no limits on transactions.',
        logo: 'checking-logo.png',
        date_release: new Date('2020-02-01'),
        date_revision: new Date('2020-07-01')
      },
      {
        id: '3',
        name: 'Investment Fund',
        description: 'High yield investment opportunities for your surplus funds.',
        logo: 'investment-logo.png',
        date_release: new Date('2020-03-01'),
        date_revision: new Date('2020-08-01')
      }
    ];
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should filter products by name', () => {
    const filteredProducts = service.filterProducts(mockProducts, 'Savings');
    expect(filteredProducts.length).toBe(1);
    expect(filteredProducts[0].id).toEqual('1');
  });

  it('should filter products by description', () => {
    const filteredProducts = service.filterProducts(mockProducts, 'access to your funds');
    expect(filteredProducts.length).toBe(1);
    expect(filteredProducts[0].id).toEqual('2');
  });

  it('should return multiple products if filter matches multiple items', () => {
    const filteredProducts = service.filterProducts(mockProducts, 'account');
    expect(filteredProducts.length).toBe(2);
    expect(filteredProducts.map(product => product.id)).toEqual(['1', '2']);
  });

  it('should return an empty array if no products match the filter', () => {
    const filteredProducts = service.filterProducts(mockProducts, 'gold');
    expect(filteredProducts.length).toBe(0);
  });

  it('should be case insensitive when filtering products', () => {
    const filteredProducts = service.filterProducts(mockProducts, 'sAvInGs');
    expect(filteredProducts.length).toBe(1);
    expect(filteredProducts[0].id).toEqual('1');
  });
});
