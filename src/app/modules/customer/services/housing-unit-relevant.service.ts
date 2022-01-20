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

  // listHousingUnitRelevant: number[];
  numFavorite:number;
  ngOnInit() {
    // if (this._serviceCustomer.customerId != 0)
    //   this.GetAllHousingUnitRelevantByCustomerId(
    //     this._serviceCustomer.customerId
    //   ).subscribe((data) => {
    //     this.listHousingUnitRelevant = data;
    //   });
    // else this.listHousingUnitRelevant = [];
  }
getNumFavorite(){
  this.GetAllHousingUnitRelevantByCustomerId(this._serviceCustomer.customerId)
        .subscribe((data) => {
          console.log(data);
          this.numFavorite = data.length;
});
}

  GetAllHousingUnitRelevantByCustomerId(id: number): Observable<number[]> {
    return this._http.get<number[]>(
      '/api/HousingUnitRelevant/GetAllHousingUnitRelevantsByCustomerId/' + id
    );
  }
  AddHousingUnitRelevant(relevantToAdd: HousingUnitRelevant) {
    return this._http.post<void>('/api/HousingUnitRelevant', relevantToAdd);
  }
  //delete housingUnit from housing-unit relevant list
  deleteHousingUnitRelevant(relevantToDelete: HousingUnitRelevant) {
    return this._http.post<void>(
      '/api/HousingUnitRelevant/DeleteHousingUnitRelevant',
      relevantToDelete
    );
  }

  // isRelevantById(id: number): boolean {
  //   if (
  //     this.listHousingUnitRelevant &&
  //     this.listHousingUnitRelevant.indexOf(id) != -1
  //   )
  //     return true;
  //   else return false;
  // }
}
