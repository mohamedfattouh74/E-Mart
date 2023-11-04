import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavRoutingModule } from './nav-routing.module';
import { NavComponent } from './nav.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [NavComponent],
  imports: [
    CommonModule,
    NavRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    MatTooltipModule,
    MatAutocompleteModule,
    MatInputModule,
  ],
  exports: [NavComponent],
})
export class NavModule {}
