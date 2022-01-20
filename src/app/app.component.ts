import { Component, OnInit } from '@angular/core';
import { customerService } from './modules/customer/services/customer.service';
import { HousingUnitRelevantService } from './modules/customer/services/housing-unit-relevant.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'UnitForRentClient';
  numFavorite: number;
  hidden: boolean = false;
  constructor(
    private _serviceCustomer: customerService,
    private _serviceHousingUnitRelevant: HousingUnitRelevantService
  ) {}
  ngOnInit() {
    this.getNumFavorite();
  }
  getNumFavorite() {
    this._serviceCustomer.getCustomerId();
    if (this._serviceCustomer.customerId != 0) {
      this._serviceHousingUnitRelevant
        .GetAllHousingUnitRelevantByCustomerId(this._serviceCustomer.customerId)
        .subscribe((data) => {
          this.hidden = true;
          this.numFavorite = data.length;
        });
    } else {
      this.hidden = false;
    }
  }
}
