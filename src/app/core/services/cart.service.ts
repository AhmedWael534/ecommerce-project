import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseUrl = 'https://ecommerce.routemisr.com/api/v1/cart';

  // We use a BehaviorSubject to keep track of cart items count
  public cartItemCount = new BehaviorSubject<number>(0);

  constructor(private _http: HttpClient) {
    // Optionally, get cart on init to set initial count
    this.getLoggedUserCart().subscribe({
      next: (res) => {
        if(res.numOfCartItems) {
          this.cartItemCount.next(res.numOfCartItems)
        }
      },
      error: () => this.cartItemCount.next(0)
    });
  }

  // 26. Add Product To Cart
  addProductToCart(productId: string): Observable<any> {
    return this._http.post(this.baseUrl, { productId: productId });
  }

  // 27. Update cart product quantity
  updateCartQuantity(productId: string, count: number): Observable<any> {
    return this._http.put(`${this.baseUrl}/${productId}`, { count: count });
  }

  // 28. Get Logged user cart
  getLoggedUserCart(): Observable<any> {
    return this._http.get(this.baseUrl);
  }

  // 29. Remove specific cart Item
  removeSpecificCartItem(productId: string): Observable<any> {
    return this._http.delete(`${this.baseUrl}/${productId}`);
  }

  // 30. Clear user cart
  clearUserCart(): Observable<any> {
    return this._http.delete(this.baseUrl);
  }
}