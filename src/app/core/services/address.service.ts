import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Address } from '../interfaces/api-models';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private baseUrl = 'https://ecommerce.routemisr.com/api/v1/addresses';

  constructor(private _http: HttpClient) { }

  // Add address
  addAddress(address: Address): Observable<any> {
    return this._http.post(this.baseUrl, address);
  }

  // Remove address
  removeAddress(addressId: string): Observable<any> {
    return this._http.delete(`${this.baseUrl}/${addressId}`);
  }

  // Get specific address
  getSpecificAddress(addressId: string): Observable<any> {
    return this._http.get(`${this.baseUrl}/${addressId}`);
  }

  // Get logged user addresses
  getLoggedUserAddresses(): Observable<any> {
    return this._http.get(this.baseUrl);
  }
}