import { Component, OnInit } from '@angular/core';
import { HousingUnit } from 'src/app/shared/_models/housing-unit.model';
import { HousingUnitService } from 'src/app/shared/_services/housing-unit.service';
import { customerService } from '../../services/customer.service';

@Component({
  selector: 'app-housing-unit-list',
  templateUrl: './housing-unit-list.component.html',
  styleUrls: ['./housing-unit-list.component.css'],
})
export class HousingUnitListComponent implements OnInit {
  constructor(private _housingUnitService: HousingUnitService, private _customerService: customerService) {}
  housingUnitList: HousingUnit[];
  customerId: number = this._customerService.customerId;
  
  ngOnInit(): void {
    this.GetHousingUnitByCustomerId();
  }


  GetHousingUnitByCustomerId() {
    this._housingUnitService
      .GetHousingUnitByCustomerId(this.customerId)
      .subscribe((data) => {
        console.log(data);
        this.housingUnitList = data;
      });
  }
  filterHousingUnitByRelevant(filterRelevant: boolean) {
    if (filterRelevant == true) {
      this._housingUnitService
        .GetHousingUnitByRelevantAndCustomerId(this.customerId)
        .subscribe((data) => {
          this.housingUnitList = data;
          console.log(data);
        });
    }
  }
  undo() {}
  save() {}
}
