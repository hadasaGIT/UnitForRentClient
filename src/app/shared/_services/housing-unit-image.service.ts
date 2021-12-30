import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HousingUnitImage } from '../_models/housing-unit-image.model';

@Injectable()
export class HousingUnitImageService {
  GetHousingUnitImageById(housingUnitId: number): Observable<HousingUnitImage> {
    return this._http.get<HousingUnitImage>(
      '/api/HousingUnitImage/GetHousingUnitImageById/' + housingUnitId
    );
  }

  constructor(private _http: HttpClient) {}
}
