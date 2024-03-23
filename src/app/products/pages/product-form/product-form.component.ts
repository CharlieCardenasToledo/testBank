import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductApiService } from 'src/app/core/http/product-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomAlertService } from 'src/app/services/custom-alert/custom-alert.service';
import { DateFormattingService } from 'src/app/services/date-formatting/date-formatting.service';
import { FormValidationService } from 'src/app/services/form-validation/form-validation.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})

/**
 * Represents a component for the product form.
 */
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;
  isEditMode: boolean = false;

  /**
   * Constructor del componente de formulario de productos.
   * @param fb - Constructor de formularios para crear el formulario de productos.
   * @param productService - Servicio para interactuar con la API de productos.
   * @param router - Servicio de enrutamiento de Angular para la navegación.
   * @param activatedRoute - Información sobre la ruta asociada al componente.
   * @param alertService - Servicio para mostrar alertas personalizadas.
   * @param dateFormattingService - Servicio para formatear fechas.
   * @param formValidationService - Servicio para validar el formulario.
   */
  constructor(
    private fb: FormBuilder,
    private productService: ProductApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private alertService: CustomAlertService,
    private dateFormattingService: DateFormattingService,
    private formValidationService: FormValidationService
  ) {
    this.productForm = this.fb.group({
      id: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      logo: ['', Validators.required],
      date_release: ['', [Validators.required, this.formValidationService.validateCurrentOrFutureDate]],
      date_revision: ['', [Validators.required]],
    }, {
      validators: [this.formValidationService.dateRevisionAfterDateReleaseValidator, this.formValidationService.dateNotPast('date_release')]
    });
  }
  /**
    * Inicializa el componente y carga el producto para editar si hay un ID presente.
    */
  ngOnInit(): void {
    const productId = this.activatedRoute.snapshot.paramMap.get('id');
    if (productId) {
      this.isEditMode = true;
      this.productService.getProductById(productId).subscribe(product => {
        if (product) {
          const formattedProduct = {
            ...product,
            date_release: product.date_release ? this.dateFormattingService.formatDate(product.date_release) : '',
            date_revision: product.date_revision ? this.dateFormattingService.formatDate(product.date_revision) : '',
          };

          this.productForm.patchValue(formattedProduct);
          this.productForm.markAllAsTouched();
          this.productForm.updateValueAndValidity();

        } else {
          this.alertService.showAlert('Error', 'Producto no encontrado', 'OK', false).then(() => {
            this.router.navigate(['/']);
          });
        }
      }, error => {
        console.error('Error fetching product', error);
        this.alertService.showAlert('Error', 'Error al buscar el producto.', 'OK', false);
      });
    }
  }
  /**
    * Maneja la presentación del formulario, creando o actualizando un producto.
    */
  onSubmit() {
    if (this.productForm.valid) {
      const product = this.productForm.value;
      if (!this.isEditMode) {
        this.productService.addProduct(product).subscribe({
          next: (response) => {
            this.alertService.showAlert('Producto agregado', 'El producto ha sido agregado con éxito.', 'OK', false).then(() => {
              this.router.navigate(['/']);
            });
          },
          error: (error) => {
            console.log(error);
            this.alertService.showAlert('Error', `Hubo un error al agregar el producto: ${error.message}`, 'OK', false);
          }
        });
      } else {
        this.productService.updateProduct(product).subscribe({
          next: (response) => {
            this.alertService.showAlert('Producto actualizado', 'El producto ha sido actualizado con éxito.', 'OK', false).then(() => {
              this.router.navigate(['/']);
            });
          },
          error: (error) => {
            this.alertService.showAlert('Error', `Hubo un error al actualizar el producto: ${error.message}`, 'OK', false);
          }
        });
      }
    } else {
      this.alertService.showAlert('Error en el formulario', 'Por favor completa el formulario correctamente.', 'OK', false);
    }
  }
  /**
    * Devuelve los controles del formulario.
    */
  get formControls() {
    return this.productForm.controls;
  }
  /**
    * Restablece el formulario a su estado inicial.
    */
  onReset() {
    this.productForm.reset();
  }
}
