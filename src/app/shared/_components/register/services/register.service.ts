import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from 'src/app/modules/customer/models/customer.model';
import { Manager } from 'src/app/modules/manager/models/manager.model';

@Injectable()
export class RegisterService {
  constructor(private _http: HttpClient) {}
  //register manager
  // registerManager(m: Manager) {
  //   return this._http.post<void>('/api/Manager', m);
  // }
  //register customer
  registerCustomer(c: Customer) {
    return this._http.post<void>('/api/Customer', c);
  }
}
