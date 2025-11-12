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

  // 10. ⬇️ ⬇️ ⬇️  هنا التعديل  ⬇️ ⬇️ ⬇️
  getAllProducts(filters: any = {}): Observable<any> {
    
    // 1. ابدأ بـ HttpParams فاضية
    let params = new HttpParams();

    // 2. (الحل) ضيف باراميتر الـ limit عشان يجيب 100 منتج
    params = params.append('limit', '100'); 

    // 3. ضيف باقي الفلاتر (زي البراند أو القسم الفرعي)
    Object.keys(filters).forEach(key => {
      if (filters[key]) {
        params = params.append(key, filters[key]);
      }
    });

    // 4. ابعت الطلب
    return this._http.get(this.baseUrl, { params: params });
  }
  // 10. ⬆️ ⬆️ ⬆️  نهاية التعديل  ⬆️ ⬆️ ⬆️

  // 11. Get Specific Product (زي ما هو)
  getSpecificProduct(id: string): Observable<any> {
    return this._http.get(`${this.baseUrl}/${id}`);
  }

  // 12. getAllCategories (زي ما هو)
  getAllCategories(): Observable<any> {
    return this._http.get(this.categoriesUrl);
  }

  // 13. جلب الأقسام الفرعية (زي ما هو)
  getSubcategoriesForCategory(categoryId: string): Observable<any> {
    return this._http.get(`${this.categoriesUrl}/${categoryId}/subcategories`);
  }

  // 14. جلب البراندات (زي ما هو)
  getAllBrands(): Observable<any> {
    return this._http.get(this.brandsUrl);
  }
}