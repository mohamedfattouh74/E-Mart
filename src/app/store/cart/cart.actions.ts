import { createAction, props } from '@ngrx/store';
import { productsModel } from '../products/products.model';

export const GET_CART = '[Cart Page] get cart';
export const SET_CART_LENGTH = '[Cart Page] set cart length';
export const ADD_TO_CART = '[Cart Page] add to cart';
export const REMOVE_FROM_CART = '[Cart Page] remove from cart';
export const CALCULATE_CART_TOTAL = '[Cart Page] get cart total';
export const CART_INITIAL_STATE = '[Checkout Page] get cart initial state';
export const ADD_PRODUCT_QUANTITY = '[Cart Page] add product quantity';
export const DECREASE_PRODUCT_QUANTITY =
  '[Cart Page] decrease product quantity';

export const getCart = createAction(GET_CART);

export const calculateCartTotal = createAction(CALCULATE_CART_TOTAL);

export const setCartLength = createAction(
  SET_CART_LENGTH,
  props<{ cartLength: number }>()
);

export const addToCart = createAction(
  ADD_TO_CART,
  props<{ product: productsModel }>()
);

export const addQuantity = createAction(
  ADD_PRODUCT_QUANTITY,
  props<{ product: productsModel }>()
);
export const decreaseQuantity = createAction(
  DECREASE_PRODUCT_QUANTITY,
  props<{ product: productsModel }>()
);

export const removeFromCart = createAction(
  REMOVE_FROM_CART,
  props<{ product: productsModel }>()
);

export const returnInitialState = createAction(CART_INITIAL_STATE);
