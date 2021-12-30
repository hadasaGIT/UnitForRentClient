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
  addFurnitureLevel(p: FurnitureLevel) {
    return this._http.post<void>('/api/FurnitureLevel', p);
  }
  updatefurnitureLevel(pc: FurnitureLevel): Observable<boolean> {
    return this._http.put<boolean>('/api/FurnitureLevel/UpdateFurnitureLevel/' + pc.id, pc)
  }
  deleteFurnitureLevel(id: number): Observable<boolean> {
    return this._http.delete<boolean>('/api/FurnitureLevel/' + id)
  }

  constructor(private _http: HttpClient) { }
}
