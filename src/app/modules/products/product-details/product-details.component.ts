import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { ProductsService } from 'src/app/services/products/products.service';
import {
  addQuantity,
  addToCart,
  getCart,
} from 'src/app/store/cart/cart.actions';
import { getCartSelector } from 'src/app/store/cart/cart.selectors';
import { productsModel } from 'src/app/store/products/products.model';
import { getSelectedProductID } from 'src/app/store/products/products.selectors';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent {
  selectedProduct: any;
  products: any = [];
  productID!: Number;
  cartProducts: productsModel[] = [];

  constructor(
    private productsService: ProductsService,
    private store: Store,
    private toastrService: ToastrService
  ) {}

  ngOnInit() {
    this.store.dispatch(getCart());
    this.productsService.allProducts.subscribe((res: any) => {
      this.products = res;
    });

    this.store.select(getSelectedProductID).subscribe((res) => {
      this.productID = res;
    });
    this.getProductByID(this.productID);
    this.store
      .select(getCartSelector)
      .subscribe((res) => (this.cartProducts = res));
  }

  getProductByID(productID: Number) {
    this.productsService.getProductByID(productID).subscribe((res) => {
      this.selectedProduct = res;
    });
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
}
