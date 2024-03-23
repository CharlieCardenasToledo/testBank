import { Component, Input } from '@angular/core';
import { MenuItem } from '../../core/models/menu';

/**
 * CustomMenuComponent proporciona un componente de menú personalizable
 * que puede mostrar una lista de elementos de menú y ejecutar una acción especificada
 * cuando se selecciona un elemento del menú. La visibilidad del menú puede alternarse.
 */
@Component({
  selector: 'app-custom-menu',
  templateUrl: './custom-menu.component.html',
  styleUrls: ['./custom-menu.component.scss']
})
export class CustomMenuComponent {
  @Input() menuItems: MenuItem[] = [];
  isMenuOpen = false;

  /**
   * Alterna la visibilidad del menú.
   */
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  /**
  * Ejecuta la acción asociada con un elemento del menú y alterna la visibilidad del menú.
  * 
  * @param action La función de acción asociada con el elemento de menú seleccionado.
  * @param arg Argumento opcional que se pasará a la función de acción.
  */
  selectItem(action: (arg?: any) => void, arg?: any) {
    action(arg);
    this.toggleMenu();
  }
}
