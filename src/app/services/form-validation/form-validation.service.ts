import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { ProductApiService } from 'src/app/core/http/product-api.service';

@Injectable({
  providedIn: 'root',
})
export class FormValidationService {
  constructor(private productService: ProductApiService) { }

  /**
   * Valida que la fecha de revisión sea posterior a la fecha de lanzamiento.
   * Este validador se aplica a nivel de grupo de formulario, permitiendo acceder a múltiples controles del formulario.
   * 
   * @returns Una función validadora que verifica si la fecha de revisión es posterior a la de lanzamiento.
   */
  dateRevisionAfterDateReleaseValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const dateRelease = control.get('date_release')?.value;
      const dateRevision = control.get('date_revision')?.value;
      return dateRelease && dateRevision && dateRevision > dateRelease ? null : { 'revisionAfterRelease': true };
    };
  }
  /**
   * Valida que una fecha no sea anterior a la fecha actual.
   * 
   * @returns Una función validadora que verifica si una fecha dada es actual o futura.
   */
  validateCurrentOrFutureDate(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const today = new Date();
      const dateValue = new Date(control.value);
      return dateValue < today ? { 'dateNotFuture': true } : null;
    };
  }
  /**
   * Verifica que una fecha específica no sea del pasado.
   * Este validador es específico para controles individuales dentro de un FormGroup, identificados por su nombre.
   * 
   * @param controlName El nombre del control a validar dentro del FormGroup.
   * @returns Una función validadora que impone que la fecha no sea pasada.
   */
  dateNotPast(controlName: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control instanceof FormGroup) {
        const formControl = control.controls[controlName];
        const currentDate = new Date().toISOString().split('T')[0];

        if (formControl && formControl.value < currentDate) {
          formControl.setErrors({ dateNotPast: true });
        } else if (formControl && formControl.errors && !formControl.errors['required']) {
          formControl.setErrors(null);
        }
      }
      return null;
    };
  }
}
