import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FurnitureLevel } from '../_models/furniture-level.models';

@Injectable()
export class FurnitureLevelService {
  getAllFurnitureLevels(): Observable<FurnitureLevel[]> {
    return this._http.get<FurnitureLevel[]>(
      '/api/furnitureLevel/GetAllfurnitureLevels'
    );
  }

  constructor(private _http: HttpClient) {}
}
