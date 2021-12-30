import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer.model';
import { Customer2 } from '../models/customer2.model';

@Injectable()
export class customerService {

  public customerId: number=this.getCustomerId();

  GetAllCustomers(): Observable<Customer[]> {
    return this._http.get<Customer[]>('/api/Customer/GetAllCustomers');
  }
  GetCustomerById(id: number): Observable<Customer2> {
    return this._http.get<Customer2>('/api/Customer/' + id);
  }
  AddCustomer(customerToAdd: Customer): Observable<boolean> {
    return this._http.put<boolean>('/api/Customer/AddCustomer/', customerToAdd);
  }
  DeleteCustomer(id: number): Observable<boolean> {
    return this._http.delete<boolean>('/api/Customer/DeleteCustomer/' + id);
  }
  UpdateCustomer(
    customerToUpdate: Customer2,
    customerId: number
  ): Observable<boolean> {
    return this._http.put<boolean>(
      '/api/Customer/UpdateCustomer/' + customerId,
      customerToUpdate
    );
  }
  getCustomerId():number{
        const login = localStorage.getItem('currentUser');
        if(login){
        return JSON.parse(login)['id'];
      }
      return 0;
  }
  constructor(private _http: HttpClient) {}
}
