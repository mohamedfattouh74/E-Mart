import { createFeatureSelector, createSelector } from '@ngrx/store';
import { cartStateModel } from './cart.model';
import { count } from 'rxjs';

export const getCart = createFeatureSelector<cartStateModel>('cart');

export const getCartSelector = createSelector(getCart, (state) => {
  return state.products;
});

export const getCartLength = createSelector(getCart, (state) => {
  return state.cartLength;
});

export const getCartTotal = createSelector(getCart, (state) => {
  return state.cartTotal;
});
