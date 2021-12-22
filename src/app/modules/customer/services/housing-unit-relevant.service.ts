import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HousingUnitRelevant } from '../models/housing-unit-relevant.model';
import { customerService } from './customer.service';

@Injectable()
export class HousingUnitRelevantService {
  constructor(
    private _http: HttpClient,
    private _serviceCustomer: customerService
  ) {}

  listHousingUnitRelevant: number[];

  ngOnInit() {
    if (this._serviceCustomer.customerId != 0)
      this.GetAllHousingUnitRelevantByCustomerId(
        this._serviceCustomer.customerId
      ).subscribe((data) => {
        this.listHousingUnitRelevant = data;
      });
    else this.listHousingUnitRelevant = [];
  }

  GetAllHousingUnitRelevantByCustomerId(id: number): Observable<number[]> {
    return this._http.get<number[]>(
      '/api/HousingUnitRelevant/GetAllHousingUnitRelevantsByCustomerId' + id
    );
  }
  isRelevantById(id: number): boolean {
    if (
      this.listHousingUnitRelevant &&
      this.listHousingUnitRelevant.indexOf(id) != -1
    )
      return true;
    else return false;
  }
}
