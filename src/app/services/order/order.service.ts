import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from 'src/app/modules/checkout/checkout-page/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  createOrder(order: Order) {
    return this.http.post(`${this.baseUrl}/orders`, order);
  }
}
