import { createFeatureSelector, createSelector } from '@ngrx/store';
import { productsStateModel } from './products.model';

export const getProductsList =
  createFeatureSelector<productsStateModel>('products');

export const getProductsSelector = createSelector(getProductsList, (state) => {
  return state.products;
});

export const getProductsLoading = createSelector(getProductsList, (state) => {
  return state.isLoading;
});

export const topRatingProductsSelector = createSelector(
  getProductsList,
  (state) => {
    return state.topRatingProducts;
  }
);

export const getProductsByCategorySelector = (category: string) =>
  createSelector(getProductsList, (state) => {
    return state.products.filter((prod) => prod.category == category);
  });

export const getProductsByPriceSelector = (
  min: number,
  max: number,
  currentCategory: string
) =>
  createSelector(getProductsList, (state) => {
    if (currentCategory != 'all') {
      return state.products.filter(
        (product) =>
          product.price >= min &&
          product.price <= max &&
          product.category == currentCategory
      );
    } else {
      return state.products.filter(
        (product) => product.price >= min && product.price <= max
      );
    }
  });

export const getSelectedProductID = createSelector(getProductsList, (state) => {
  return state.selectedProductID;
});

export const getProductError = createSelector(getProductsList, (state) => {
  return state.error;
});
