import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import {
  addQuantity,
  calculateCartTotal,
  decreaseQuantity,
  getCart,
  removeFromCart,
} from 'src/app/store/cart/cart.actions';
import {
  getCartLength,
  getCartSelector,
  getCartTotal,
} from 'src/app/store/cart/cart.selectors';
import { productsModel } from 'src/app/store/products/products.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  constructor(private toastrService: ToastrService, private store: Store) {}
  cartLength: number = 0;
  cartProducts: any;
  cartTotal: number = 0;

  defaultFreeShipping: number = 200;
  remainingFreeShipping!: number;

  ngOnInit() {
    this.store.dispatch(getCart());
    this.store.dispatch(calculateCartTotal());
    this.store.select(getCartSelector).subscribe((res) => {
      this.cartProducts = res;
    });
    this.store
      .select(getCartLength)
      .subscribe((res) => (this.cartLength = res));
    this.store.select(getCartTotal).subscribe((res) => {
      console.log(res);
      this.cartTotal = res;
      this.remainingFreeShipping = this.defaultFreeShipping - this.cartTotal;
    });
  }

  addProductQuantity(selectedProduct: productsModel) {
    this.store.dispatch(addQuantity({ product: selectedProduct }));
  }
  decreaseProductQuantity(selectedProduct: productsModel) {
    this.store.dispatch(decreaseQuantity({ product: selectedProduct }));
  }

  removeProductFromCart(product: productsModel) {
    this.store.dispatch(removeFromCart({ product: product }));
    this.toastrService.success(
      'Item Successfully removed from your Cart',
      'Success'
    );
  }
}
