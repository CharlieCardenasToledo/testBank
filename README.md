# Estructura del Proyecto

Este proyecto sigue un patrón de estructura modular típico de las aplicaciones Angular. A continuación, se ofrece una visión general de los directorios y archivos principales, destacando el propósito y la funcionalidad que proporcionan al proyecto.

## Módulo Core

Contiene clases de un solo uso y servicios singleton esenciales para la aplicación. También incluye la lógica de inicio principal de la aplicación.

- `http`: Contiene servicios que manejan solicitudes HTTP.

  - [product-api.service.ts](https://github.com/CharlieCardenasToledo/testBank/blob/main/src/app/core/http/product-api.service.ts "product-api.services.ts"): Servicio para llamadas a la API relacionadas con productos.

  | Función                            | Descripción                                          |
  | ----------------------------------- | ----------------------------------------------------- |
  | `getProducts()`                   | Obtiene todos los productos financieros disponibles.  |
  | `getProductById(productId)`       | Obtiene un producto financiero específico por su ID. |
  | `addProduct(product)`             | Añade un nuevo producto financiero.                  |
  | `updateProduct(product)`          | Actualiza un producto financiero existente.           |
  | `deleteProduct(productId)`        | Elimina un producto financiero por su ID.             |
  | `checkProductIdExists(productId)` | Verifica si un ID de producto financiero existe.      |
- `models`: Definiciones de modelos de datos e interfaces.

  - [menu.ts](https://github.com/CharlieCardenasToledo/testBank/blob/main/src/app/core/models/menu.ts "menu.ts"):  Define una interfaz para elementos del menú con texto y una acción.
  - [product.model.ts](https://github.com/CharlieCardenasToledo/testBank/blob/main/src/app/core/models/product.model.ts "product.model.ts"):  Define una interfaz para un producto financiero, incluyendo ID, nombre, descripción y demás propiedades relevantes.

## Módulo de Características

Representa módulos basados en características. Este proyecto incluye un módulo de característica `products`.

- [product-form](https://github.com/CharlieCardenasToledo/testBank/tree/main/src/app/products/pages/product-form "product-form"): Componentes relacionados con la funcionalidad del formulario de producto.
- [product-list](https://github.com/CharlieCardenasToledo/testBank/tree/main/src/app/products/pages "product-list"): Componentes para mostrar una lista de productos.

## Módulo Compartido

  Contiene componentes, directivas y pipes que se comparten en toda la aplicación.

- `custom-alert`: Un componente para mostrar mensajes de alerta personalizados.
- `custom-menu`: Un componente para mostrar un menú personalizado con acciones.

## Servicios

  Encapsula la lógica de negocio y las capas de acceso a datos. Cada servicio tiene una sola responsabilidad.

- `custom-alert.service.ts`: Este servicio proporciona una manera de mostrar alertas personalizadas dentro de una aplicación Angular. A continuación, se detallan los métodos disponibles en el servicio:

| Método                                                                           | Descripción                                                                                                                                                                                                                                                                |
| --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `constructor(componentFactoryResolver, appRef, injector)`                       | Constructor del servicio, inicializa el servicio con las dependencias necesarias para la creación dinámica de componentes, inyección de dependencias y gestión de la aplicación.                                                                                       |
| `showAlert(title, message, confirmButtonText = 'Yes', showCancelButton = true)` | Muestra una alerta personalizada en la página. Permite configurar el título, mensaje, texto del botón de confirmación y si se muestra el botón de cancelar. Devuelve una promesa que se resuelve con un booleano indicando si se presionó el botón de confirmación. |
| `removeAlertComponentFromBody(alertCompRef)`                                    | Método privado utilizado para eliminar el componente de alerta del cuerpo del documento una vez que el usuario interactúa con él. Es llamado internamente por el servicio.                                                                                               |

- `date-formatting.service.ts`: Servicio para manejar el formato de fechas

| Método        | Descripción                                                               | Parámetros             | Retorna    |
| -------------- | -------------------------------------------------------------------------- | ----------------------- | ---------- |
| `formatDate` | Formatea una fecha desde una cadena o un objeto `Date` a `YYYY-MM-DD`. | `date: string \| Date` | `string` |

`form-validation.service.ts`: Servicio para validar entradas de formulario.

| Método                                   | Descripción                                                                                                  | Parámetros             | Retorna         |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------- | ----------------------- | --------------- |
| `dateRevisionAfterDateReleaseValidator` | Valida que la fecha de revisión sea posterior a la fecha de lanzamiento, a nivel de grupo de formulario.     | Ninguno                 | `ValidatorFn` |
| `validateCurrentOrFutureDate`           | Valida que una fecha no sea anterior a la fecha actual, aplicable a controles individuales.                   | Ninguno                 | `ValidatorFn` |
| `dateNotPast`                           | Verifica que una fecha específica no sea del pasado, para controles individuales dentro de un `FormGroup`. | `controlName: string` | `ValidatorFn` |

`pagination.service.ts`: Servicio para manejar la lógica de paginación.


| Método                 | Descripción                                                                                                             | Parámetros                           | Retorna                |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------ | ------------------------------------- | ---------------------- |
| `paginateProducts`    | Pagina los productos financieros dados en base a la página actual y los elementos por página.                          | `products: FinancialProduct[]`      | `FinancialProduct[]` |
| `setItemsPerPage`     | Establece el número de elementos por página y recalcula el total de páginas. También reinicia la página actual a 1. | `value: number, totalItems: number` | Nada (void)            |
| `calculateTotalPages` | Calcula el número total de páginas basándose en el total de elementos y los elementos por página.                    | `totalItems: number`                | Nada (void)            |
| `setCurrentPage`      | Establece la página actual para la paginación.                                                                         | `page: number`                      | Nada (void)            |
| `getCurrentPage`      | Obtiene la página actual.                                                                                               | N/A                                   | `number`             |
| `getTotalPages`       | Obtiene el total de páginas.                                                                                            | N/A                                   | `number`             |

`product-filter.service.ts`: Servicio para filtrar listas de productos.| Método            | Descripción                                                                                                                                   

| Método            | Descripción                                                                                                                                   | Parámetros                                          | Retorna                |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- | ---------------------- |
| `filterProducts` | Filtra una lista de productos financieros basándose en una cadena de filtro que puede coincidir con el nombre o la descripción del producto. | `products: FinancialProduct[]`, `filter: string` | `FinancialProduct[]` |

## Archivos Principales de la Aplicación

- `app.component.*`: Archivos del componente raíz.
- `app.module.ts`: El módulo raíz que indica a Angular cómo ensamblar la aplicación.

# Configuración del Servidor de Desarrollo

La configuración del servidor de desarrollo es crucial para asegurar que tu aplicación Angular se comunique de manera eficaz con los backends o servicios externos durante el desarrollo. Dentro del archivo `angular.json`, bajo la sección `projects > testBank > architect > serve > configurations > development`, se especifica una configuración importante: `proxyConfig`.

## Proxy Configuration (`proxyConfig`)

El `proxyConfig` se utiliza para definir un archivo de configuración de proxy que redirecciona ciertas solicitudes de API a un servidor backend específico, evitando así problemas de CORS (Cross-Origin Resource Sharing) durante el desarrollo. Esta configuración permite que tu aplicación en desarrollo se comunique con APIs que se encuentran alojadas en dominios diferentes al servidor de desarrollo de Angular.

## Entornos

Archivos de configuración para diferentes entornos de despliegue como desarrollo, pruebas y producción.

- `environment.ts`: Configuraciones del entorno de desarrollo.
- `environment.prod.ts`: Configuraciones del entorno de producción.



| Clave          | Descripción                                                                                                                       |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `production` | Indica si la aplicación se ejecuta en modo de producción. Configurado como `false` significa modo de desarrollo.               |
| `apiUrl`     | La URL base para las llamadas a la API. Especifica la ruta al microservicio de productos financieros.                              |
| `authorId`   | Un identificador para el autor o usuario que realiza las operaciones, utilizado para trazabilidad, auditoría o control de acceso. |

# Comenzando

Para comenzar con este proyecto, clona el repositorio, instala las dependencias y ejecuta el servidor de desarrollo.

```bash
git  clone https://github.com/CharlieCardenasToledo/testBank.git
cd testBank
npm  install
ng  serve
```

Abre tu navegador y navega a `http://localhost:4200/` para ver la aplicación.

# Construcción para Producción

 Para construir el proyecto para producción, ejecuta el siguiente comando:

```bash
ng  build 
```

Esto generará los archivos en el directorio `dist/`, listos para su despliegue.
