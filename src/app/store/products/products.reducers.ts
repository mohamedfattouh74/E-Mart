import { createReducer, on } from '@ngrx/store';
import { productState } from './products.state';
import {
  getProducts,
  getProductsSuccess,
  getProductsFail,
  setSelectedProductID,
  getTopRatingProducts,
  getTopRatingProductsSuccess,
} from './products.actions';

export const productReducer = createReducer(
  productState,
  on(getProducts, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(getProductsSuccess, (state, action) => {
    return {
      ...state,
      products: action.products,
      error: '',
      isLoading: false,
    };
  }),
  on(getProductsFail, (state, action) => {
    return {
      ...state,
      products: [],
      error: action.error,
    };
  }),
  on(setSelectedProductID, (state, action) => {
    return {
      ...state,
      selectedProductID: action.productID,
    };
  }),
  on(getTopRatingProducts, (state) => {
    return {
      ...state,
    };
  }),
  on(getTopRatingProductsSuccess, (state, action) => {
    return {
      ...state,
      topRatingProducts: action.products,
    };
  })
);
