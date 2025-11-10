import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {
  private baseUrl = 'https://ecommerce.routemisr.com/api/v1/brands';

  constructor(private _http: HttpClient) { }

  // 17. Get All Brands
  getAllBrands(): Observable<any> {
    return this._http.get(this.baseUrl);
  }

  // 18. Get Specific Brand
  getSpecificBrand(id: string): Observable<any> {
    return this._http.get(`${this.baseUrl}/${id}`);
  }
}