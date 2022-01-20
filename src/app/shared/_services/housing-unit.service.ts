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
    return this._http.get<HousingUnit[]>(
      '/api/HousingUnit/GetHousingUnitByRelevantAndCustomerId/' + customerId
    );
  }
  GetHousingUnitByCustomerId(customerId: number): Observable<HousingUnit[]> {
    console.log(customerId);
    return this._http.get<HousingUnit[]>(
      '/api/HousingUnit/GetHousingUnitByCustomerId/' + customerId
    );
  }
  GetHousingUnitById(id: number): Observable<HousingUnit> {
    return this._http.get<HousingUnit>(
      '/api/HousingUnit/GetHousingUnitById/' + id
    );
  }
  AddHousingUnit(h: HousingUnit): Observable<number> {
    return this._http.post<number>('/api/HousingUnit', h);
  }
  UpdateHousingUnit(
    housingUnitToUpdate: HousingUnit,
    housingUnitId: number
  ): Observable<boolean> {
    console.log(housingUnitToUpdate);
    return this._http.put<boolean>(
      '/api/HousingUnit/UpdateHousingUnit/' + housingUnitId,
      housingUnitToUpdate
    );
  }
  deleteHousingUnit(id: number): Observable<boolean> {
    return this._http.delete<boolean>('/api/HousingUnit/' + id);
  }
  constructor(private _http: HttpClient) {}
}
