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
  addPropertyCondition(p: PropertyCondition) {
    return this._http.post<void>('/api/PropertyCondition', p);
  }
  updatePropertyCondition(pc: PropertyCondition): Observable<boolean> {
    return this._http.put<boolean>('/api/PropertyCondition/UpdatePropertyCondition/' + pc.id, pc)
  }
  deletePropertyCondition(id: number): Observable<boolean> {
    return this._http.delete<boolean>('/api/PropertyCondition/' + id)
  }
  constructor(private _http: HttpClient) { }
}
