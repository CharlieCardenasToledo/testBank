import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './products/pages/product-list/product-list.component';
import { ProductFormComponent } from './products/pages/product-form/product-form.component';

const routes: Routes = [
  { path: '', component: ProductListComponent },
  {
    path: 'producto',
    children: [
      { path: 'agregar', component: ProductFormComponent },
      { path: 'editar/:id', component: ProductFormComponent }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
