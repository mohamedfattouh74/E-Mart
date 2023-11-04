import { createAction, props } from '@ngrx/store';
import { productsModel } from './products.model';

export const GET_PRODUCTS = '[Products Page] get products';
export const GET_PRODUCTS_SUCCESS = '[Products Page] get products success ';
export const GET_PRODUCTS_FAIL = '[Products Page] get products fail';
export const GET_TOP_RATING_PRODUCTS = '[Landing Page] get top rating products';
export const GET_TOP_RATING_PRODUCTS_SUCCESS =
  '[Landing Page] get top rating products success ';
export const SET_SELECTED_PRODUCT_ID =
  '[Products Page] set selected product id';

export const getProducts = createAction(GET_PRODUCTS);
export const getProductsSuccess = createAction(
  GET_PRODUCTS_SUCCESS,
  props<{ products: productsModel[] }>()
);

export const getTopRatingProducts = createAction(GET_TOP_RATING_PRODUCTS);
export const getTopRatingProductsSuccess = createAction(
  GET_TOP_RATING_PRODUCTS_SUCCESS,
  props<{ products: productsModel[] }>()
);

export const getProductsFail = createAction(
  GET_PRODUCTS_FAIL,
  props<{ error: string }>()
);

export const setSelectedProductID = createAction(
  SET_SELECTED_PRODUCT_ID,
  props<{ productID: number }>()
);
