import { productsModel } from '../products/products.model';

export interface cartStateModel {
  products: productsModel[];
  cartLength: number;
  error: string;
  cartTotal: number;
}
