import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { productsModel } from 'src/app/store/products/products.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}
  baseUrl = 'http://localhost:3000';

  allProducts = new BehaviorSubject('');

  cart: any = [];
  cartLength = new BehaviorSubject(0);

  getProducts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/products`);
  }

  getProductByID(productID: Number) {
    return this.http.get(`${this.baseUrl}/products/${productID}`);
  }

  getTopRatingProducts(): Observable<productsModel[]> {
    return this.http.get<productsModel[]>(`${this.baseUrl}/top-rating`);
  }
}
