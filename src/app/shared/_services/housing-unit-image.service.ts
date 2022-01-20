import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HousingUnitImage } from '../_models/housing-unit-image.model';

@Injectable()
export class HousingUnitImageService {
  GetHousingUnitImagesById(
    housingUnitId: number
  ): Observable<HousingUnitImage[]> {
    return this._http.get<HousingUnitImage[]>(
      '/api/HousingUnitImage/GetHousingUnitImagesById/' + housingUnitId
    );
  }
  AddHousingUnitImage(p: HousingUnitImage) {
    return this._http.post<void>('/api/HousingUnitImage', p);
  }
  deleteHousingUnitImage(id: number): Observable<boolean> {
    return this._http.delete<boolean>('/api/HousingUnitImage/' + id);
  }
  updateHousingUnitImage(pc: HousingUnitImage): Observable<boolean> {
    return this._http.put<boolean>(
      '/api/HousingUnitImage/UpdateHousingUnitImage',
      pc
    );
  }
  deleteAllHousingUnitImage(housingUnitId: number): Observable<boolean> {
    return this._http.delete<boolean>(
      '/api/HousingUnitImage/deleteAllHousingUnitImage/' + housingUnitId
    );
  }
  constructor(private _http: HttpClient) {}
}
