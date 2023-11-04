import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './modules/landing-page/landing-page.component';
import { authGuard } from './modules/authentication/guards/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./modules/products/products.module').then(
        (m) => m.ProductsModule
      ),
    canLoad: [authGuard],
  },
  {
    path: 'cart',
    loadChildren: () =>
      import('./modules/cart/cart.module').then((m) => m.CartModule),
  },

  {
    path: 'checkout',
    loadChildren: () =>
      import('./modules/checkout/checkout.module').then(
        (m) => m.CheckoutModule
      ),
    canLoad: [authGuard],
  },
  { path: '', component: LandingPageComponent },
  { path: '**', component: LandingPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
