import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Customer } from "../../customer/models/customer.model";

@Injectable()
export class CustomerService {
    GetAllCustomers(): Observable<Customer[]> {
        return this._http.get<Customer[]>('/api/Customer/GetAllCustomers')
    }
    deleteCustomer(id: number): Observable<boolean> {
        return this._http.delete<boolean>('/api/Customer/' + id)
    }
    constructor(private _http: HttpClient) { }
}
