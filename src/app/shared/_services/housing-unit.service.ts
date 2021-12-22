import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HousingUnit } from '../_models/housing-unit.model';

@Injectable()
export class HousingUnitService {
  getAllHousingUnits(): Observable<HousingUnit[]> {
    return this._http.get<HousingUnit[]>('/api/HousingUnit/GetAllHousingUnits');
  }
  GetHousingUnitByRelevantAndCustomerId(
    customerId: number
  ): Observable<HousingUnit[]> {
    console.log(customerId);
    return this._http.get<HousingUnit[]>(
      '/api/HousingUnit/GetHousingUnitByRelevantAndCustomerId/' + customerId
    );
  }
  GetHousingUnitByCustomerId(customerId: number): Observable<HousingUnit[]> {
    return this._http.get<HousingUnit[]>(
      '/api/HousingUnit/GetHousingUnitByCustomerId/' + customerId
    );
  }
  GetHousingUnitById(id: number): Observable<HousingUnit> {
    return this._http.get<HousingUnit>(
      '/api/HousingUnit/GetHousingUnitById/' + id
    );
  }
  AddHousingUnit(h: HousingUnit) {
    return this._http.post<void>('/api/HousingUnit', h);
  }
  constructor(private _http: HttpClient) {}
}
