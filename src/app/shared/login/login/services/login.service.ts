// import { HttpClient } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../models/login.model';
import { LoginResponse } from '../models/LoginResponse.model';

@Injectable()
export class LoginService {
  login(login: Login): Observable<LoginResponse> {
    return this._http.post<LoginResponse>('/api/Login', login);
  }
  constructor(private _http: HttpClient) {}
}
