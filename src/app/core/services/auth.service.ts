import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthResponse } from '../interfaces/api-models';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://ecommerce.routemisr.com/api/v1/auth';
  private usersUrl = 'https://ecommerce.routemisr.com/api/v1/users';

  public userData = new BehaviorSubject<any>(null);
  public authStatus = new BehaviorSubject<boolean>(this.isLoggedIn());

  constructor(private _http: HttpClient, private _router: Router) {
    if (this.isLoggedIn()) {
      const storedUser = localStorage.getItem('userData');
      if (storedUser) {
        this.userData.next(JSON.parse(storedUser));
      }
    }
  }

  // Update Logged user password
  updateMyPassword(passwordData: any): Observable<any> {
    return this._http.put(`${this.usersUrl}/changeMyPassword`, passwordData).pipe(
      tap((response: any) => {

        if (response.token) {
          this.handleLoginSuccess(response.token, response.user || this.userData.getValue());
        }
      })
    );
  }


  // Update Logged user data
  updateMyData(userData: any): Observable<any> {
    return this._http.put(`${this.usersUrl}/updateMe/`, userData);
  }

  // Get All Users
  getAllUsers(): Observable<any> {
    return this._http.get(this.usersUrl);
  }

  // Signup
  signup(userData: any): Observable<AuthResponse> {
    return this._http.post<AuthResponse>(`${this.baseUrl}/signup`, userData);
  }

  // Signin
  signin(userData: any): Observable<AuthResponse> {
    return this._http.post<AuthResponse>(`${this.baseUrl}/signin`, userData).pipe(
      tap((response: AuthResponse) => {
        if (response.token && response.user) {

          this.handleLoginSuccess(response.token, response.user);
        }
      })
    );
  }


  forgotPassword(emailData: any): Observable<any> {
    return this._http.post(`${this.baseUrl}/forgotPasswords`, emailData);
  }

  verifyResetCode(codeData: any): Observable<any> {
    return this._http.post(`${this.baseUrl}/verifyResetCode`, codeData);
  }

  resetPassword(passwordData: any): Observable<any> {
    return this._http.put(`${this.baseUrl}/resetPassword`, passwordData);
  }

  verifyToken(tokenData: any): Observable<any> {
    return this._http.post(`${this.baseUrl}/verifyToken`, tokenData);
  }

  // Helper function
  isLoggedIn(): boolean {
    return !!localStorage.getItem('userToken');
  }


  // Logout function
  logout(): void {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');

    this.authStatus.next(false);
    this.userData.next(null);

    this._router.navigate(['/auth/login']);
  }

  private handleLoginSuccess(token: string, user: any): void {
    localStorage.setItem('userToken', token);
    localStorage.setItem('userData', JSON.stringify(user));

    this.authStatus.next(true);
    this.userData.next(user);
  }
}