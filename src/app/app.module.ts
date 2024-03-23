import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './products/pages/product-list/product-list.component';
import { ProductFormComponent } from './products/pages/product-form/product-form.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomAlertComponent } from './shared/custom-alert/custom-alert.component';
import { CustomAlertService } from './services/custom-alert/custom-alert.service';
import { CustomMenuComponent } from './shared/custom-menu/custom-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductFormComponent,
    CustomAlertComponent,
    CustomMenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [CustomAlertService],
  bootstrap: [AppComponent]
})
export class AppModule { }
