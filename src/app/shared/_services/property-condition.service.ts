import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PropertyCondition } from '../_models/propery-condition.model';

@Injectable()
export class PropertyConditionService {
  getAllPropertyConditions(): Observable<PropertyCondition[]> {
    return this._http.get<PropertyCondition[]>(
      '/api/PropertyCondition/GetAllPropertyConditions'
    );
  }
  AddPropertyCondition(p: PropertyCondition) {
    return this._http.post<void>('/api/PropertyCondition', p);
  }
  constructor(private _http: HttpClient) {}
}
