import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PropertyCondition } from '../_models/property-condition.model';

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
  deletePropertyCondition(id: number): Observable<boolean> {
    return this._http.delete<boolean>('/api/PropertyCondition/' + id);
  }
  updatePropertyCondition(pc: PropertyCondition): Observable<boolean> {
    return this._http.put<boolean>(
      '/api/PropertyCondition/UpdatePropertyCondition',
      pc
    );
  }
  constructor(private _http: HttpClient) {}
}
