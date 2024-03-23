import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductApiService } from 'src/app/core/http/product-api.service';
import { FinancialProduct } from 'src/app/core/models/product.model';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { CustomAlertService } from 'src/app/services/custom-alert/custom-alert.service';
import { MenuItem } from 'src/app/core/models/menu';
import { ProductFilterService } from 'src/app/services/product-filter/product-filter.service';
import { PaginationService } from 'src/app/services/pagination/pagination.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],

})
export class ProductListComponent implements OnInit, OnDestroy {
  products: FinancialProduct[] = [];
  paginatedProducts: FinancialProduct[] = [];
  searchText = new FormControl('');
  itemsPerPageControl = new FormControl(5);
  message = { isLoading: true, text: "Cargando productos..." };
  menuItems: MenuItem[] = [];
  private subscriptions = new Subscription();

  constructor(
    private productService: ProductApiService,
    private router: Router,
    private alertService: CustomAlertService,
    private filterService: ProductFilterService,
    private paginationService: PaginationService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.subscriptions.add(this.productService.getProducts().subscribe(
      data => this.handleProductFetchSuccess(data),
      error => this.handleProductFetchError(error)
    ));

    this.subscriptions.add(this.searchText.valueChanges.subscribe(value => {
      this.applyFilters();
    }));

    this.subscriptions.add(this.itemsPerPageControl.valueChanges.subscribe(value => {
      this.handleItemsPerPageChange(value);
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
  /**
   * Maneja el éxito en la obtención de productos. Actualiza la lista de productos,
   * aplica los filtros y cambia el estado de carga.
   * @param {FinancialProduct[]} data Los productos financieros obtenidos.
   * @private
  */ 
  private handleProductFetchSuccess(data: FinancialProduct[]): void {
    this.products = data;
    this.applyFilters();
    this.message.isLoading = false;
  }
  /**
   * Maneja el error en la obtención de productos. Actualiza el mensaje de estado para reflejar el error.
   * @param {any} error El error obtenido al intentar cargar los productos.
   * @private
   */
  private handleProductFetchError(error: any): void {
    this.message.isLoading = false;
    this.message.text = "Hubo un error al cargar los productos. Intente de nuevo.";
  }
  /**
   * Maneja el cambio en la cantidad de elementos por página. Aplica filtros y recalcula la paginación
   * basándose en el valor seleccionado.
   * @param {number | null} value El número de elementos por página seleccionado, o null.
   * @private
   */
  private handleItemsPerPageChange(value: number | null): void {
    const searchValue = this.searchText.value || '';
    const filteredProducts = this.filterService.filterProducts(this.products, searchValue);
    this.paginationService.setItemsPerPage(value ?? 5, filteredProducts.length);
    this.applyFilters();
  }
  /**
   * Aplica los filtros de búsqueda a los productos y actualiza los productos paginados.
   * También solicita un nuevo cálculo de las páginas totales.
   * @private
   */
  private applyFilters(): void {
    const searchValue = this.searchText.value || '';
    const filteredProducts = this.filterService.filterProducts(this.products, searchValue);
    this.paginationService.calculateTotalPages(filteredProducts.length);
    this.paginatedProducts = this.paginationService.paginateProducts(filteredProducts);
    this.cdr.markForCheck();
  }

  /**
   * Obtiene el total de páginas disponibles después de aplicar filtros y paginación.
   * @returns {number} El número total de páginas.
   */
  get totalPages(): number {
    return this.paginationService.getTotalPages();
  }
  /**
   * Obtiene la página actual en la paginación.
   * @returns {number} La página actual.
   */
  get currentPage(): number {
    return this.paginationService.getCurrentPage();
  }

  /**
   * Obtiene el índice del primer producto en la página actual.
   * @returns {number} El índice del primer producto.
   */
  get startIndex(): number {
    return (this.currentPage - 1) * (this.itemsPerPageControl.value ?? 0) + 1;
  }

  /**
   * Obtiene el índice del último producto en la página actual.
   * @returns {number} El índice del último producto.
   */
  get endIndex(): number {
    const end = this.startIndex + this.paginatedProducts.length - 1;
    return end;
  }

  /**
   * Navega a la página de edición del producto seleccionado.
   * @param {FinancialProduct} product El producto a editar.
   */
  editProduct(product: FinancialProduct): void {
    this.router.navigate(['producto/editar', product.id]);
  }
  /**
   * Muestra una alerta de confirmación para la eliminación de un producto. Si se confirma,
   * procede a eliminar el producto.
   * @param {string} productId El ID del producto a eliminar.
   * @param {string} productName El nombre del producto a eliminar.
   */
  deleteProduct(productId: string, productName: string): void {
    this.alertService.showAlert(
      'Confirmación',
      `¿Estás seguro de eliminar el producto ${productName}?`, // Mensaje de la alerta
      'Eliminar',
      true
    ).then(isConfirmed => {
      if (isConfirmed) {
        this.performProductDeletion(productId);
      }
    });
  }
  /**
   * Realiza la eliminación del producto mediante una llamada al servicio de API y maneja la respuesta.
   * @param {string} productId El ID del producto a eliminar.
   * @private
   */
  private performProductDeletion(productId: string): void {
    this.productService.deleteProduct(productId).subscribe({
      next: () => this.handleProductDeletionSuccess(productId),
      error: (error) => this.handleProductDeletionError(error)
    });
  }
  /**
   * Maneja el éxito en la eliminación de un producto, actualizando la lista de productos
   * y mostrando una alerta de éxito.
   * @param {string} productId El ID del producto eliminado.
   * @private
   */
  private handleProductDeletionSuccess(productId: string): void {
    console.log(this.paginatedProducts)
    this.products = this.products.filter(product => product.id !== productId);
    this.cdr.markForCheck();
    this.alertService.showAlert('Eliminado!', 'El producto se ha eliminado.', 'Ok', false);
    this.applyFilters();
  }
  /**
   * Maneja el error en la eliminación de un producto, mostrando una alerta de error.
   * @param {any} error El error obtenido durante la eliminación del producto.
   * @private
   */
  private handleProductDeletionError(error: any): void {
    this.alertService.showAlert('Error', 'No se pudo eliminar el producto. Intente de nuevo.', 'Ok', false);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.paginationService.setCurrentPage(this.currentPage - 1);
      this.applyFilters();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.paginationService.setCurrentPage(this.currentPage + 1);
      this.applyFilters();
    }
  }
  /**
   * Obtiene los elementos de menú para las acciones disponibles en un producto específico.
   * @param {FinancialProduct} product El producto para el cual obtener los elementos de menú.
   * @returns {MenuItem[]} Los elementos de menú disponibles para el producto.
   */
  getMenuItems(product: FinancialProduct): MenuItem[] {
    return [
      {
        text: 'Editar',
        action: () => this.editProduct(product)
      },
      {
        text: 'Eliminar',
        action: () => this.deleteProduct(product.id, product.name)
      }
    ];
  }
}

