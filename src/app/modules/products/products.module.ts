import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [ProductsListComponent, ProductDetailsComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    NgxPaginationModule,
    MatRadioModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    MatAutocompleteModule,
    MatInputModule,
    MatSliderModule,
    MatProgressSpinnerModule,
  ],
  exports: [ProductDetailsComponent, ProductsListComponent],
})
export class ProductsModule {}
