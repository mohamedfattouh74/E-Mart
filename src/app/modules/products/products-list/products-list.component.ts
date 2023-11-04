import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  getCategoriesSelector,
  getSelectedCategory,
} from 'src/app/store/category/category.selectors';
import { getCategories } from 'src/app/store/category/category.actions';
import { setSelectedCategory } from 'src/app/store/category/category.actions';
import { getProducts } from 'src/app/store/products/products.actions';
import {
  getProductsByCategorySelector,
  getProductsByPriceSelector,
  getProductsLoading,
  getProductsSelector,
} from 'src/app/store/products/products.selectors';
import { productsModel } from 'src/app/store/products/products.model';
import { setSelectedProductID } from 'src/app/store/products/products.actions';
import {
  addQuantity,
  addToCart,
  getCart,
} from 'src/app/store/cart/cart.actions';
import { getCartSelector } from 'src/app/store/cart/cart.selectors';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent {
  title: string = '';
  page: number = 1;
  count: number = 0;
  tableSize: number = 15;
  categories: string[] = [];
  products: productsModel[] = [];
  selectedProductID: any = 0;
  selectedpriceMin: number = 0;
  selectedpriceMax: number = 300;
  selectedCategory!: string;
  cartProducts: any = [];
  element: any;
  isLoading!: boolean;

  constructor(private store: Store, private toastrService: ToastrService) {}

  ngOnInit() {
    this.store.select(getProductsLoading).subscribe((res) => {
      this.isLoading = res;
    });
    this.element = document.getElementById('top');
    this.element?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'nearest',
    });
    this.store.dispatch(getCart());
    this.store.dispatch(getCategories());

    this.store.select(getCategoriesSelector).subscribe((res) => {
      this.categories = res;
    });

    this.store.dispatch(getProducts());
    this.store.select(getProductsSelector).subscribe((res) => {
      this.products = res;
    });

    this.store
      .select(getCartSelector)
      .subscribe((res) => (this.cartProducts = res));
  }

  setStateSelectedCategory(category: string) {
    this.store.dispatch(setSelectedCategory({ selectedCategory: category }));
    if (category == 'all') {
      this.store
        .select(getProductsSelector)
        .subscribe((res) => (this.products = res));
    } else {
      this.store
        .select(getProductsByCategorySelector(category))
        .subscribe((res) => {
          this.products = res;
        });
    }
  }

  setPriceFilter() {
    this.store.select(getSelectedCategory).subscribe((res) => {
      this.selectedCategory = res;
    });
    this.store
      .select(
        getProductsByPriceSelector(
          this.selectedpriceMin,
          this.selectedpriceMax,
          this.selectedCategory
        )
      )
      .subscribe((res) => {
        this.products = res;
      });
  }

  setSelectedProduct(productID: number) {
    this.store.dispatch(setSelectedProductID({ productID: productID }));
  }
  onPageChange(event: any) {
    this.page = event;
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
