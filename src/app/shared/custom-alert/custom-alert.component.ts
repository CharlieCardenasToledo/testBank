import { Component, Input, Output, EventEmitter, ChangeDetectorRef, OnInit } from '@angular/core';

/**
 * Componente para mostrar alertas personalizadas en la aplicación.
 * Puede ser configurado para mostrar un título, mensaje, icono y botones
 * de confirmación y cancelación con textos personalizables.
 */
@Component({
  selector: 'app-custom-alert',
  templateUrl: './custom-alert.component.html',
  styleUrls: ['./custom-alert.component.scss']
})
export class CustomAlertComponent {
  @Input() showAlert: boolean = false;
  @Input() title: string = '';
  @Input() message: string = '';
  @Input() icon: string = ''; // Nuevo
  @Input() showCancelButton: boolean = true; // Nuevo
  @Input() confirmButtonText: string = 'Confirm'; // Nuevo
  @Input() DenyButtonText: string = 'Cancel'; // Nuevo
  @Output() result = new EventEmitter<{ isConfirmed: boolean, isDenied: boolean }>();

  /**
   * Función que se ejecuta al confirmar la alerta.
   * Emite un evento con isConfirmed en true y isDenied en false,
   * y oculta la alerta.
   */
  confirm() {
    this.result.emit({ isConfirmed: true, isDenied: false });
    this.showAlert = false;
  }
  /**
   * Función que se ejecuta al negar o cancelar la alerta.
   * Emite un evento con isConfirmed en false y isDenied en true,
   * y oculta la alerta.
   */
  deny() {
    this.result.emit({ isConfirmed: false, isDenied: true });
    this.showAlert = false;
  }
}
