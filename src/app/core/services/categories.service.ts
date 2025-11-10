import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private baseUrl = 'https://ecommerce.routemisr.com/api/v1/categories';
  private subcatBaseUrl = 'https://ecommerce.routemisr.com/api/v1/subcategories';

  constructor(private _http: HttpClient) { }

  // 12. Get All Categories
  getAllCategories(): Observable<any> {
    return this._http.get(this.baseUrl);
  }

  // 13. Get Specific Category
  getSpecificCategory(id: string): Observable<any> {
    return this._http.get(`${this.baseUrl}/${id}`);
  }

  // 14. Get All SubCategories
  getAllSubCategories(): Observable<any> {
    return this._http.get(this.subcatBaseUrl);
  }

  // 15. Get Specific SubCategory
  getSpecificSubCategory(id: string): Observable<any> {
    return this._http.get(`${this.subcatBaseUrl}/${id}`);
  }

  // 16. Get SubCategories On Category
  getSubCategoriesOnCategory(id: string): Observable<any> {
    return this._http.get(`${this.baseUrl}/${id}/subcategories`);
  }
}