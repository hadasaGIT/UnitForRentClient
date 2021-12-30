//import { HttpClient } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HousingUnit } from '../../../_models/housing-unit.model';
import { Search } from '../models/search.model';

@Injectable()
export class SearchService {
  search(searchParams: Search): Observable<HousingUnit[]> {
    return this._http.post<HousingUnit[]>('/api/Search/Search', searchParams);
  }

  constructor(private _http: HttpClient) {}
}
