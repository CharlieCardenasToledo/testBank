import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FinancialProduct } from '../models/product.model';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

/**
 * Servicio para interactuar con la API de productos financieros.
 * Proporciona métodos para obtener, agregar, actualizar y eliminar productos financieros,
 * así como para verificar la existencia de un producto por su ID.
 */
@Injectable({
  providedIn: 'root'
})
export class ProductApiService {
  private readonly apiUrl = environment.apiUrl;
  private readonly authorId = environment.authorId;

  constructor(private http: HttpClient) { }

  /**
   * Genera los headers HTTP necesarios para las solicitudes a la API.
   * @returns {HttpHeaders} Objeto HttpHeaders con el 'authorId' incluido.
   */
  private getHeaders(): HttpHeaders {
    return new HttpHeaders().set('authorId', this.authorId);
  }

  /**
   * Obtiene todos los productos financieros disponibles.
   * @returns {Observable<FinancialProduct[]>} Un observable que contiene un array de productos financieros.
   */
  getProducts(): Observable<FinancialProduct[]> {
    return this.http.get<FinancialProduct[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  /**
   * Obtiene un producto financiero específico por su ID.
   * @param {string} productId El ID del producto financiero a obtener.
   * @returns {Observable<FinancialProduct | undefined>} Un observable que contiene el producto financiero encontrado o undefined si no se encuentra.
   */
  getProductById(productId: string): Observable<FinancialProduct | undefined> {
    return this.getProducts().pipe(
      map(products => products.find(product => product.id === productId)),
      catchError(() => of(undefined))
    );
  }

  /**
   * Añade un nuevo producto financiero.
   * @param {FinancialProduct} product El producto financiero a añadir.
   * @returns {Observable<FinancialProduct>} Un observable que contiene el producto financiero añadido.
   */
  addProduct(product: FinancialProduct): Observable<FinancialProduct> {
    return this.http.post<FinancialProduct>(this.apiUrl, product, { headers: this.getHeaders() });
  }

  /**
   * Actualiza un producto financiero existente.
   * @param {FinancialProduct} product El producto financiero a actualizar.
   * @returns {Observable<FinancialProduct>} Un observable que contiene el producto financiero actualizado.
   */
  updateProduct(product: FinancialProduct): Observable<FinancialProduct> {
    return this.http.put<FinancialProduct>(this.apiUrl, product, { headers: this.getHeaders() });
  }

  /**
   * Elimina un producto financiero por su ID.
   * @param {string} productId El ID del producto financiero a eliminar.
   * @returns {Observable<any>} Un observable que confirma la eliminación.
   */
  deleteProduct(productId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}?id=${productId}`, { headers: this.getHeaders(), responseType: 'text' });
  }

  /**
   * Verifica si un ID de producto financiero existe.
   * @param {string} productId El ID del producto financiero a verificar.
   * @returns {Observable<boolean>} Un observable que indica si el producto existe (true) o no (false).
   */
  checkProductIdExists(productId: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/verification?id=${productId}`, { headers: this.getHeaders() });
  }
}
