import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private baseUrl = 'https://ecommerce.routemisr.com/api/v1/products';
  private categoriesUrl = 'https://ecommerce.routemisr.com/api/v1/categories';
  private brandsUrl = 'https://ecommerce.routemisr.com/api/v1/brands';

  constructor(private _http: HttpClient) { }

  getAllProducts(filters: any = {}): Observable<any> {

    let params = new HttpParams();

    params = params.append('limit', '100');

    Object.keys(filters).forEach(key => {
      if (filters[key]) {
        params = params.append(key, filters[key]);
      }
    });

    return this._http.get(this.baseUrl, { params: params });
  }
  

  // Get Specific Product
  getSpecificProduct(id: string): Observable<any> {
    return this._http.get(`${this.baseUrl}/${id}`);
  }

  // getAllCategories
  getAllCategories(): Observable<any> {
    return this._http.get(this.categoriesUrl);
  }

  getSubcategoriesForCategory(categoryId: string): Observable<any> {
    return this._http.get(`${this.categoriesUrl}/${categoryId}/subcategories`);
  }

  // getAllBrands
  getAllBrands(): Observable<any> {
    return this._http.get(this.brandsUrl);
  }
}