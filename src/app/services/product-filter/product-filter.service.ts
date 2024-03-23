import { Injectable } from '@angular/core';
import { FinancialProduct } from 'src/app/core/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductFilterService {

  constructor() { }
  filterProducts(products: FinancialProduct[], filter: string): FinancialProduct[] {
    return products.filter(product =>
      product.name.toLowerCase().includes(filter.toLowerCase()) ||
      product.description.toLowerCase().includes(filter.toLowerCase())
    );
  }
}
