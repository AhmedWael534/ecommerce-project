import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private baseUrl = 'https://ecommerce.routemisr.com/api/v1/orders';

  constructor(private _http: HttpClient) { }

  // 31. Create Cash Order
  createCashOrder(cartId: string, shippingAddress: any): Observable<any> {
    return this._http.post(`${this.baseUrl}/${cartId}`, { shippingAddress: shippingAddress });
  }

  // 32. Get All Orders (Admin only)
  getAllOrders(): Observable<any> {
    return this._http.get(this.baseUrl);
  }

  // 33. Get User Orders
  getUserOrders(userId: string): Observable<any> {
    // Note: The API docs say 6407cf6f515bdcf347c09f17 which is a user ID
    // We should get this ID dynamically, but for now we hardcode it
    // In a real app, you'd get the logged-in user's ID
    return this._http.get(`${this.baseUrl}/user/6407cf6f515bdcf347c09f17`);
  }

  // 34. Checkout session (Online Payment)
  checkoutSession(cartId: string, shippingAddress: any): Observable<any> {
    // The API URL seems to need the host URL.
    const hostUrl = 'http://localhost:4200'; // Change this to your live URL on deployment
    return this._http.post(`${this.baseUrl}/checkout-session/${cartId}?url=${hostUrl}`, { shippingAddress: shippingAddress });
  }
}