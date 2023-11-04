import { createReducer, on } from '@ngrx/store';
import { cartState } from './cart.state';
import {
  getCart,
  setCartLength,
  addToCart,
  removeFromCart,
  calculateCartTotal,
  returnInitialState,
  addQuantity,
  decreaseQuantity,
} from './cart.actions';

export const cartReducer = createReducer(
  cartState,
  on(getCart, (state) => {
    return {
      ...state,
    };
  }),
  on(calculateCartTotal, (state: any) => {
    return {
      ...state,
    };
  }),

  on(setCartLength, (state, action) => {
    return {
      ...state,
      cartLength: action.cartLength,
    };
  }),
  on(addToCart, (state, action) => {
    return {
      ...state,
      products: [...state.products, action.product],
      cartLength: state.cartLength + 1,
      cartTotal: state.cartTotal + action.product.price,
    };
  }),
  on(addQuantity, (state, action) => {
    return {
      ...state,
      products: [
        ...state.products.map((prod) =>
          prod.id == action.product.id
            ? { ...prod, quantity: prod.quantity + 1 }
            : prod
        ),
      ],
      cartTotal: state.cartTotal + action.product.price,
    };
  }),
  on(decreaseQuantity, (state, action) => {
    return {
      ...state,
      products: [
        ...state.products.map((prod) =>
          prod.id == action.product.id
            ? {
                ...prod,
                quantity:
                  prod.quantity == 1 ? prod.quantity : prod.quantity - 1,
              }
            : prod
        ),
      ],
      cartTotal:
        action.product.quantity > 1
          ? state.cartTotal - action.product.price
          : state.cartTotal,
    };
  }),
  on(removeFromCart, (state, action) => {
    return {
      ...state,
      products: [
        ...state.products.filter((prod) => prod.id !== action.product.id),
      ],
      cartLength: state.cartLength - 1,
      cartTotal:
        state.cartTotal - action.product.price * action.product.quantity,
    };
  }),
  on(returnInitialState, (state, action) => {
    return {
      ...state,
      products: [],
      cartLength: 0,
      cartTotal: 0,
    };
  })
);
