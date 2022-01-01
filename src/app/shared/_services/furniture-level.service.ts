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
  addFurnitureLevel(f: FurnitureLevel) {
    return this._http.post<void>('/api/FurnitureLevel', f);
  }
  updateFurnitureLevel(f: FurnitureLevel): Observable<boolean> {
    return this._http.put<boolean>(
      '/api/FurnitureLevel/UpdateFurnitureLevel/' + f.id,
      f
    );
  }
  deleteFurnitureLevel(id: number): Observable<boolean> {
    return this._http.delete<boolean>('/api/FurnitureLevel/' + id);
  }

  constructor(private _http: HttpClient) {}
}
