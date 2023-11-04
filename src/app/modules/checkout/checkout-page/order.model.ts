import { productsModel } from 'src/app/store/products/products.model';

export interface Order {
  firstName: string;
  lastName: string;
  email: string;
  phone: number;
  country: string;
  city: string;
  street: string;
  postcode: number;
  apartment: string;
  packagingType: string;
  paymentType: string;
  cardNumber?: number;
  expirationDate?: string;
  cvv?: number;
  id?: number;
  products: productsModel[];
}
