import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private baseUrl = 'https://ecommerce.routemisr.com/api/v1/orders';

  constructor(private _http: HttpClient) { }

  // Create Cash Order
  createCashOrder(cartId: string, shippingAddress: any): Observable<any> {
    return this._http.post(`${this.baseUrl}/${cartId}`, { shippingAddress: shippingAddress });
  }

  // Get All Orders
  getAllOrders(): Observable<any> {
    return this._http.get(this.baseUrl);
  }

  
  // Get User Orders
  getUserOrders(userId: string): Observable<any> {
    
    return this._http.get(`${this.baseUrl}/user/${userId}`); 
  }

  // Checkout session (Online Payment)
  checkoutSession(cartId: string, shippingAddress: any): Observable<any> {
    const hostUrl = 'http://localhost:4200';
    return this._http.post(`${this.baseUrl}/checkout-session/${cartId}?url=${hostUrl}`, { shippingAddress: shippingAddress });
  }
}