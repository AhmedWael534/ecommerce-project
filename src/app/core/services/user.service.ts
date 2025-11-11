import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'https://ecommerce.routemisr.com/api/v1/users';

  constructor(private _http: HttpClient) { }

  // Update Logged User Password
  updatePassword(passwordData: any): Observable<any> {
    return this._http.put(`${this.baseUrl}/changeMyPassword`, passwordData);
  }

  // Update Logged User Data
  updateUserData(userData: any): Observable<any> {
    return this._http.put(`${this.baseUrl}/updateMe/`, userData);
  }

  // Get All Users
  getAllUsers(): Observable<any> {
    return this._http.get(this.baseUrl);
  }
}