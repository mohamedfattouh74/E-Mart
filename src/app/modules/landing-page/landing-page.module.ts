import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingPageRoutingModule } from './landing-page-routing.module';
import { LandingPageComponent } from './landing-page.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MapComponent } from 'src/app/core/map/map.component';

@NgModule({
  declarations: [LandingPageComponent],
  imports: [
    CommonModule,
    LandingPageRoutingModule,
    CarouselModule,
    MapComponent,
  ],
  exports: [LandingPageComponent],
})
export class LandingPageModule {}
