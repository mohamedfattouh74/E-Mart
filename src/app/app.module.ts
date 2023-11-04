import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavModule } from './modules/nav/nav.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LandingPageModule } from './modules/landing-page/landing-page.module';
import { FooterModule } from './modules/footer/footer.module';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { categoryReducer } from './store/category/category.reducers';
import { CategoriesEffects } from './store/category/category.effects';
import { productReducer } from './store/products/products.reducers';
import { ProductsEffects } from './store/products/products.effects';
import { cartReducer } from './store/cart/cart.reducers';
import { authReducer } from './store/auth/auth.reducers';
import { AuthEffects } from './store/auth/auth.effects';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NavModule,
    BrowserAnimationsModule,
    LandingPageModule,
    FooterModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      progressBar: true,
      progressAnimation: 'increasing',
      preventDuplicates: true,
      positionClass: 'toast-top-right',
      closeButton: true,
    }),
    NgxMatSelectSearchModule,
    StoreModule.forRoot({
      categories: categoryReducer,
      products: productReducer,
      cart: cartReducer,
      auth: authReducer,
    }),
    EffectsModule.forRoot([CategoriesEffects, ProductsEffects, AuthEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
