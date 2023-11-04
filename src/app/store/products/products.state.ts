import { productsStateModel } from './products.model';

export const productState: productsStateModel = {
  products: [],
  topRatingProducts: [],
  selectedProductID: 0,
  error: '',
  isLoading: true,
};
