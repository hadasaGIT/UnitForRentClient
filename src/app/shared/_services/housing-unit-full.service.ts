import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { promise } from 'protractor';
import { observable, Observable } from 'rxjs';
import { HousingUnitRelevantService } from 'src/app/modules/customer/services/housing-unit-relevant.service';
import { HousingUnitFull } from '../_models/housing-unit-full.model';
import { HousingUnit } from '../_models/housing-unit.model';
import { HousingUnitImageService } from './housing-unit-image.service';

@Injectable()
export class HousingUnitFullService {
  constructor(private _http: HttpClient) {}

  GetAllHousingUnitsFull(customerId: number): Observable<HousingUnitFull[]> {
    return this._http.get<HousingUnitFull[]>(
      '/api/HousingUnitFull/GetAllHousingUnitsFull/' + customerId
    );
  }
  x: string = '';
  GetHousingUnitFullByHousingUnit(
    housingUnitId: number,
    customerId: number
  ): Observable<HousingUnitFull> {
    console.log(housingUnitId);
    console.log(customerId);
    this.x = housingUnitId + 'b' + customerId;
    return this._http.get<HousingUnitFull>(
      '/api/HousingUnitFull/GetHousingUnitFullByHousingUnit/' + this.x
    );
  }
}
