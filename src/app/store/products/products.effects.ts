import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import {
  getProducts,
  getProductsSuccess,
  getTopRatingProducts,
  getTopRatingProductsSuccess,
} from './products.actions';
import { ProductsService } from 'src/app/services/products/products.service';

@Injectable()
export class ProductsEffects {
  constructor(
    private actions$: Actions,
    private productsService: ProductsService
  ) {}
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getProducts),
      exhaustMap(() => {
        return this.productsService.getProducts().pipe(
          map((productss) => {
            return getProductsSuccess({ products: productss });
          }),
          catchError((err) => EMPTY)
        );
      })
    )
  );

  loadTopRatingProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getTopRatingProducts),
      exhaustMap(() => {
        return this.productsService.getTopRatingProducts().pipe(
          map((topRatingProducts) => {
            return getTopRatingProductsSuccess({ products: topRatingProducts });
          }),
          catchError((err) => EMPTY)
        );
      })
    )
  );
}
