import { Injectable, ComponentFactoryResolver, ApplicationRef, Injector, EmbeddedViewRef } from '@angular/core';
import { CustomAlertComponent } from '../../shared/custom-alert/custom-alert.component';

@Injectable({
  providedIn: 'root'
})
export class CustomAlertService {
  /**
   * Constructor del servicio de alertas personalizadas.
   * 
   * @param componentFactoryResolver Resuelve los componentes fábrica para la creación dinámica de componentes.
   * @param appRef Referencia a la aplicación, necesaria para adjuntar y despegar vistas del componente.
   * @param injector El inyector de dependencias, usado para inyectar el componente de alerta.
   */
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) { }

  /**
   * Muestra una alerta personalizada en la página actual.
   * 
   * @param title El título de la alerta.
   * @param message El mensaje de la alerta.
   * @param confirmButtonText El texto del botón de confirmación (predeterminado a 'Yes').
   * @param showCancelButton Si se debe mostrar o no el botón de cancelar (predeterminado a true).
   * @returns Una promesa que resuelve a un booleano, indicando si el botón de confirmación fue presionado (true) o no.
   */
  showAlert(title: string, message: string, confirmButtonText: string = 'Yes', showCancelButton: boolean = true): Promise<boolean> {
    return new Promise((resolve) => {
      const alertCompRef = this.componentFactoryResolver
        .resolveComponentFactory(CustomAlertComponent)
        .create(this.injector);

      alertCompRef.instance.title = title;
      alertCompRef.instance.message = message;
      alertCompRef.instance.confirmButtonText = confirmButtonText;
      alertCompRef.instance.showCancelButton = showCancelButton;

      this.appRef.attachView(alertCompRef.hostView);

      const domElem = (alertCompRef.hostView as EmbeddedViewRef<any>)
        .rootNodes[0] as HTMLElement;

      document.body.appendChild(domElem);

      alertCompRef.instance.result.subscribe((result) => {
        this.removeAlertComponentFromBody(alertCompRef);
        resolve(result.isConfirmed);
      });

      alertCompRef.instance.showAlert = true;
    });
  }
  /**
   * Elimina el componente de alerta del cuerpo del documento.
   * 
   * @param alertCompRef La referencia al componente de alerta para ser removido.
   */
  private removeAlertComponentFromBody(alertCompRef: any) {
    this.appRef.detachView(alertCompRef.hostView);
    alertCompRef.destroy();
  }

}
