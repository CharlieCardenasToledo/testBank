import { Injectable } from '@angular/core';
import { FinancialProduct } from 'src/app/core/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  private itemsPerPage: number = 5;
  private currentPage: number = 1;
  private totalPages: number = 0;

  constructor() { }

  /**
   * Pagina los productos financieros dados en base a la página actual y los elementos por página.
   * 
   * @param {FinancialProduct[]} products - La lista de productos financieros a paginar.
   * @returns {FinancialProduct[]} Una sublista de productos correspondiente a la página actual.
   */
  paginateProducts(products: FinancialProduct[]): FinancialProduct[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return products.slice(start, end);
  }

  /**
   * Establece el número de elementos por página y recalcula el total de páginas.
   * También reinicia la página actual a 1.
   * 
   * @param {number} value - Número de elementos por página.
   * @param {number} totalItems - Total de elementos a paginar.
   */
  setItemsPerPage(value: number, totalItems: number) {
    this.itemsPerPage = value;
    this.calculateTotalPages(totalItems);
    this.currentPage = 1;
  }

  /**
   * Calcula el número total de páginas basándose en el total de elementos y los elementos por página.
   * 
   * @param {number} totalItems - Total de elementos a paginar.
   */
  calculateTotalPages(totalItems: number) {
    this.totalPages = Math.ceil(totalItems / this.itemsPerPage);
    if (this.currentPage > this.totalPages) {
      this.setCurrentPage(Math.max(this.totalPages, 1));
    }
  }
  /**
   * Establece la página actual para la paginación.
   * 
   * @param {number} page - La página a establecer como actual.
   */

  setCurrentPage(page: number) {
    this.currentPage = page;
  }
  /**
   * Obtiene la página actual.
   * 
   * @returns {number} La página actual.
   */
  getCurrentPage(): number {
    return this.currentPage;
  }
  /**
   * Obtiene el total de páginas.
   * 
   * @returns {number} El total de páginas.
   */
  getTotalPages(): number {
    return this.totalPages;
  }
}
