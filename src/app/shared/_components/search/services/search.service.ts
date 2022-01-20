//import { HttpClient } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HousingUnitFull } from 'src/app/shared/_models/housing-unit-full.model';
import { HousingUnit } from '../../../_models/housing-unit.model';
import { Search } from '../models/search.model';

@Injectable()
export class SearchService {
  search(searchParams: Search): Observable<HousingUnitFull[]> {
    return this._http.post<HousingUnitFull[]>('/api/Search/Search', searchParams);
  }

  constructor(private _http: HttpClient) {}
}
