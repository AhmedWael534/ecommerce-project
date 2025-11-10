import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthResponse } from '../interfaces/api-models';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://ecommerce.routemisr.com/api/v1/auth';
  
  // Subject to track login status
  public authStatus = new BehaviorSubject<boolean>(this.isLoggedIn());

  constructor(private _http: HttpClient, private _router: Router) {}

  // 1. Signup
  signup(userData: any): Observable<AuthResponse> {
    return this._http.post<AuthResponse>(`${this.baseUrl}/signup`, userData);
  }

  // 2. Signin
  signin(userData: any): Observable<AuthResponse> {
    return this._http.post<AuthResponse>(`${this.baseUrl}/signin`, userData);
  }

  // 3. Forgot Password
  forgotPassword(emailData: any): Observable<any> {
    return this._http.post(`${this.baseUrl}/forgotPasswords`, emailData);
  }

  // 4. Verify Reset Code
  verifyResetCode(codeData: any): Observable<any> {
    return this._http.post(`${this.baseUrl}/verifyResetCode`, codeData);
  }

  // 5. Reset Password
  resetPassword(passwordData: any): Observable<any> {
    return this._http.put(`${this.baseUrl}/resetPassword`, passwordData);
  }

  // 6. Verify Token (You added this, might be custom)
  verifyToken(tokenData: any): Observable<any> {
    return this._http.post(`${this.baseUrl}/verifyToken`, tokenData);
  }

  // Helper function to check login
  isLoggedIn(): boolean {
    return !!localStorage.getItem('userToken');
  }

  // Logout function
  logout(): void {
    localStorage.removeItem('userToken');
    this.authStatus.next(false);
    this._router.navigate(['/auth/login']);
  }

  // Helper to update status on login
  setLoggedIn(): void {
    this.authStatus.next(true);
  }
}