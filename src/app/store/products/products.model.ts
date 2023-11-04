export interface productsModel {
  id: number;
  image_url: string;
  price: number;
  name: string;
  category: string;
  rate?: number;
  quantity?: any;
}

export interface productsStateModel {
  products: productsModel[];
  topRatingProducts: productsModel[];
  selectedProductID: Number;
  error: string;
  isLoading: boolean;
}
