import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Customer } from "../models/customer.model";

@Injectable()
export class customerService {
    GetAllCustomers(): Observable<Customer[]> {
    return this._http.get<Customer[]>("/api/Customer/GetAllCustomers");
    }
    // מה הפונקציות אמורות להחזיר? task????
    GetCustomerById(id:number):Observable<Customer>{
    return this._http.get<Customer>("/api/Customer/GetCustomerById/"+id);
    }
    AddCustomer(customerToAdd:Customer):Observable<boolean>{
    return this._http.put<boolean>("/api/Customer/AddCustomer/",customerToAdd);
    }
    DeleteCustomer(id:number):Observable<boolean>{
    return this._http.delete<boolean>("/api/Customer/DeleteCustomer/"+id);
    }
    UpdateCustomer(customerToUpdate:Customer):Observable<boolean>{
    return this._http.put<boolean>("/api/Customer/UpdateCustomer/",customerToUpdate);
    }
    constructor(private _http: HttpClient ) {}
}