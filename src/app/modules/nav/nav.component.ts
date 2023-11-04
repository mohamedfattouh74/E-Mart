import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, startWith, map } from 'rxjs';
import { getCartLength } from 'src/app/store/cart/cart.selectors';
import { getProductsSelector } from 'src/app/store/products/products.selectors';
import {
  getProducts,
  setSelectedProductID,
} from 'src/app/store/products/products.actions';
import { productsModel } from 'src/app/store/products/products.model';
import { getIsLogged } from 'src/app/store/auth/auth.selectors';
import { signOut } from 'src/app/store/auth/auth.actions';
import { ToastrService } from 'ngx-toastr';
import { returnInitialState } from 'src/app/store/cart/cart.actions';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  cartLength: number = 0;
  products: productsModel[] = [];
  productsForm!: FormGroup;
  selectedProductID: any = 0;
  filterOptions!: Observable<productsModel[]>;
  isLogged!: boolean;

  constructor(
    private store: Store,
    private router: Router,
    private toastrService: ToastrService
  ) {}

  ngOnInit() {
    this.productsForm = new FormGroup({
      selectedProduct: new FormControl(''),
    });
    this.store
      .select(getCartLength)
      .subscribe((res) => (this.cartLength = res));
    this.store.dispatch(getProducts());

    this.store.select(getProductsSelector).subscribe((res) => {
      this.products = res;
    });

    this.filterOptions = this.productsForm.valueChanges.pipe(
      startWith(''),
      map((value) => {
        return this._FILTER(value.selectedProduct || '');
      })
    );

    this.store.select(getIsLogged).subscribe((res) => (this.isLogged = res));
  }

  onSubmitSearch() {
    this.store.dispatch(
      setSelectedProductID({
        productID: this.productsForm.value.selectedProduct,
      })
    );
    this.productsForm.reset();
    this.router.navigate(['/products/details']);
  }

  _FILTER(value: string): productsModel[] {
    let searchValue = value;
    return this.products.filter((product) =>
      product.name.includes(searchValue)
    );
  }

  toggleDropdown() {
    document.querySelector('.dropdown')?.classList.toggle('hidden');
  }

  closeDropDown() {
    document.querySelector('.dropdown')?.classList.add('hidden');
  }

  signOut() {
    this.store.dispatch(signOut());
    this.store.dispatch(returnInitialState());
    this.toastrService.success('Successfully logged out', 'Success!');
    this.router.navigate(['/']);
  }
}
