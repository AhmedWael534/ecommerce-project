import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private baseUrl = 'https://ecommerce.routemisr.com/api/v1/wishlist';

  constructor(private _http: HttpClient) { }

  // Add product to wishlist
  addProductToWishlist(productId: string): Observable<any> {
    return this._http.post(this.baseUrl, { productId: productId });
  }

  // Remove product from wishlist
  removeProductFromWishlist(productId: string): Observable<any> {
    return this._http.delete(`${this.baseUrl}/${productId}`);
  }

  // Get logged user wishlist
  getLoggedUserWishlist(): Observable<any> {
    return this._http.get(this.baseUrl);
  }
}