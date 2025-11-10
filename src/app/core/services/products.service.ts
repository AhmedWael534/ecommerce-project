import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private baseUrl = 'https://ecommerce.routemisr.com/api/v1/products';

  constructor(private _http: HttpClient) { }

  // 10. Get All Products
  getAllProducts(): Observable<any> {
    return this._http.get(this.baseUrl);
  }

  // 11. Get Specific Product
  getSpecificProduct(id: string): Observable<any> {
    return this._http.get(`${this.baseUrl}/${id}`);
  }
}