import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  removeFromCart,
  returnInitialState,
} from 'src/app/store/cart/cart.actions';
import { cartReducer } from 'src/app/store/cart/cart.reducers';
import { getCart, getCartTotal } from 'src/app/store/cart/cart.selectors';
import { productsModel } from 'src/app/store/products/products.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { countries } from './countries-options';
import { OrderService } from 'src/app/services/order/order.service';
import { getUser } from 'src/app/store/auth/auth.selectors';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css'],
})
export class CheckoutPageComponent {
  constructor(
    private store: Store,
    private router: Router,
    private toastrService: ToastrService,
    private orderService: OrderService
  ) {}
  isCardPayment: boolean = false;
  cartProducts!: productsModel[];
  cartTotal: number = 0;
  deliveryAmount: number = 20;
  checkoutForm: any = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    street: new FormControl('', Validators.required),
    postcode: new FormControl('', Validators.required),
    apartment: new FormControl('', Validators.required),
    packagingType: new FormControl('Without Plastic', Validators.required),
    paymentType: new FormControl('', Validators.required),
    cardNumber: new FormControl(''),
    expirationDate: new FormControl(''),
    cvv: new FormControl(''),
  });
  countries = countries;

  submitForm() {
    if (this.checkoutForm.valid) {
      this.orderService
        .createOrder({
          ...this.checkoutForm.value,
          products: this.cartProducts,
        })
        .subscribe((res) => {});
      this.router.navigate(['/']);
      this.toastrService.success(
        'You order was created successfully 🎉',
        'Success!'
      );
      this.store.dispatch(returnInitialState());
    } else {
      this.toastrService.error('Please Fill Checkout Form', 'Failure');
    }
  }

  ngOnInit() {
    this.store.select(getCart).subscribe((res) => {
      this.cartProducts = res.products;
    });
    this.store.select(getCartTotal).subscribe((res) => {
      this.cartTotal = res;
    });
  }

  removeProductFromCart(product: productsModel) {
    this.store.dispatch(removeFromCart({ product: product }));
    this.toastrService.success(
      'Item Successfully removed from your Cart',
      'Success'
    );
  }
  paymentType: string = '';
  setCardPayment() {
    this.paymentType == 'card'
      ? (this.isCardPayment = true)
      : (this.isCardPayment = false);
  }
}
