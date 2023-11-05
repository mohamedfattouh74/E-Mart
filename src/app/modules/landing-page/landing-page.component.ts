import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { getIsLogged } from 'src/app/store/auth/auth.selectors';
import {
  addQuantity,
  addToCart,
  getCart,
} from 'src/app/store/cart/cart.actions';
import { getCartSelector } from 'src/app/store/cart/cart.selectors';
import { getTopRatingProducts } from 'src/app/store/products/products.actions';
import { productsModel } from 'src/app/store/products/products.model';
import { topRatingProductsSelector } from 'src/app/store/products/products.selectors';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent {
  topRatingProducts: productsModel[] = [];
  cartProducts: productsModel[] = [];
  isLogged!: boolean;

  constructor(private store: Store, private toastrService: ToastrService) {}
  ngOnInit() {
    this.store.dispatch(getCart());
    this.store.dispatch(getTopRatingProducts());
    this.store.select(topRatingProductsSelector).subscribe((res) => {
      this.topRatingProducts = res;
      console.log(this.topRatingProducts);
    });
    this.store
      .select(getCartSelector)
      .subscribe((res) => (this.cartProducts = res));
    this.store.select(getIsLogged).subscribe((res) => (this.isLogged = res));
  }
  addProductToCart(selectedProduct: productsModel) {
    let productWithQuantity = { ...selectedProduct, quantity: 1 };
    if (
      this.cartProducts.some(
        (prod: productsModel) => prod.id == selectedProduct.id
      )
    ) {
      this.store.dispatch(addQuantity({ product: selectedProduct }));
    } else {
      this.store.dispatch(addToCart({ product: productWithQuantity }));
    }
    this.toastrService.success(
      'Item Successfully added to your Cart',
      'Success'
    );
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 1000,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      740: {
        items: 1,
      },
      940: {
        items: 1,
      },
    },
    nav: true,
  };
}
