import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'https://ecommerce.routemisr.com/api/v1/users';

  constructor(private _http: HttpClient) { }

  // 7. Update Logged User Password
  updatePassword(passwordData: any): Observable<any> {
    return this._http.put(`${this.baseUrl}/changeMyPassword`, passwordData);
  }

  // 8. Update Logged User Data
  updateUserData(userData: any): Observable<any> {
    return this._http.put(`${this.baseUrl}/updateMe/`, userData);
  }

  // 9. Get All Users (Note: This might be an admin-only endpoint)
  getAllUsers(): Observable<any> {
    return this._http.get(this.baseUrl);
  }
}