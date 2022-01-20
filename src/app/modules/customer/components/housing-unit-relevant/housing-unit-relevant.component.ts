import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { SearchService } from 'src/app/shared/_components/search/services/search.service';
import { FurnitureLevel } from 'src/app/shared/_models/furniture-level.models';
import { HousingUnitFull } from 'src/app/shared/_models/housing-unit-full.model';
import { PropertyCondition } from 'src/app/shared/_models/property-condition.model';
import { FurnitureLevelService } from 'src/app/shared/_services/furniture-level.service';
import { HousingUnitFullService } from 'src/app/shared/_services/housing-unit-full.service';
import { PropertyConditionService } from 'src/app/shared/_services/property-condition.service';
import { Customer2 } from '../../models/customer2.model';
import { HousingUnitRelevant } from '../../models/housing-unit-relevant.model';
import { customerService } from '../../services/customer.service';
import { HousingUnitRelevantService } from '../../services/housing-unit-relevant.service';

@Component({
  selector: 'app-housing-unit-relevant',
  templateUrl: './housing-unit-relevant.component.html',
  styleUrls: [
    './housing-unit-relevant.component.css',
    '../../../../shared/_components/search/search-component/search.component.css',
  ],
})
export class HousingUnitRelevantComponent implements OnInit {
  customerId = this._serviceCustomer.customerId;
  address: string;
  listHousingUnit: HousingUnitFull[] = [];
  panelOpenState = false;
  listPropertyConditions: PropertyCondition[];
  listFurnitureLevel: FurnitureLevel[];
  open: boolean = false;
  valueDescription = '';
  housingUnitRelevant?: HousingUnitRelevant = undefined;
  currentUser: Customer2;
  unitOwners: Customer2[] = [];
  hide: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private _router: Router,
    private _serviceCustomer: customerService,
    private _serviceHousingUnitRelevant: HousingUnitRelevantService,
    private _servicePropertyCondition: PropertyConditionService,
    private _serviceFurnitureLevel: FurnitureLevelService,
    private _snackBar: MatSnackBar,
    private _app: AppComponent,
    private _serviceHousingUnitFull: HousingUnitFullService
  ) {}

  ngOnInit(): void {
    this.getPropertyCondition();
    this.getFurnitureLevel();
    this.getCustomerById();
    this.GetAllHousingUnitRelevantByCustomerId();
  }
  getHousingUnitFull(id: number, index: number) {
    this._serviceHousingUnitFull
      .GetHousingUnitFullByHousingUnit(id, this._serviceCustomer.customerId)
      .subscribe((res) => {
        this.listHousingUnit[index] = res;
      });
  }
  GetAllHousingUnitRelevantByCustomerId() {
    this.listHousingUnit = [];
    this.unitOwners = [];
    this._serviceHousingUnitRelevant
      .GetAllHousingUnitRelevantByCustomerId(this._serviceCustomer.customerId)
      .subscribe((res) => {
        let index = 0;
        res.forEach((element) => {
          this.getHousingUnitFull(element, index);
          this.getUnitOwner(element, index);
          index++;
        });
        console.log(this.listHousingUnit);
      });
  }
  getPropertyCondition() {
    this._servicePropertyCondition
      .getAllPropertyConditions()
      .subscribe((res) => {
        this.listPropertyConditions = res;
      });
  }
  getFurnitureLevel() {
    this._serviceFurnitureLevel.getAllFurnitureLevels().subscribe((res) => {
      this.listFurnitureLevel = res;
    });
  }
  getFurnitureLevelById(id: number): string {
    let s = 'ללא';
    this.listFurnitureLevel.forEach((furniture) => {
      if (furniture.id == id) s = furniture.level;
    });
    return s;
  }
  getPropertyConditionById(id: number): string {
    let s = 'סביר';
    this.listPropertyConditions.forEach((p) => {
      if (p.id == id) s = p.condition;
    });
    return s;
  }
  //favorite
  addFavorite(id: number) {
    this.housingUnitRelevant = {
      CustomersId: this._serviceCustomer.customerId,
      HousingUnitId: id,
    };
    if (this._serviceCustomer.getUserType() > 0) {
      try {
        this._serviceHousingUnitRelevant
          .AddHousingUnitRelevant(this.housingUnitRelevant)
          .subscribe(() => {
            this._app.numFavorite += 1;
            this.GetAllHousingUnitRelevantByCustomerId();
            this.housingUnitRelevant = undefined;
          });
      } catch (err) {
        this._snackBar.open('אופסס, קרתה תקלה בשרת, נסה שוב!', '  ', {
          duration: 2000,
        });
      }
    } else {
      this._snackBar.open('נא התחבר לחשבונך, או צור חשבון חדש', '  ', {
        duration: 2000,
      });
    }
  }
  removeFavorite(id: number) {
    this.housingUnitRelevant = {
      CustomersId: this._serviceCustomer.customerId,
      HousingUnitId: id,
    };
    try {
      this._serviceHousingUnitRelevant
        .deleteHousingUnitRelevant(this.housingUnitRelevant)
        .subscribe(() => {
          this._app.numFavorite -= 1;
          this.GetAllHousingUnitRelevantByCustomerId();
        });
    } catch (err) {
      this._snackBar.open('אופסס, קרתה תקלה בשרת, נסה שוב!', '  ', {
        duration: 2000,
      });
    }
  }

  openDetailsHousingUnit(id: number) {
    this._router.navigate([]).then((result) => {
      window.open('../details/' + id, '_blank');
    });
  }
  getCustomerById() {
    this._serviceCustomer.getCustomerId();
    this._serviceCustomer
      .GetCustomerById(this._serviceCustomer.customerId)
      .subscribe((customer) => {
        this.currentUser = customer;
      });
  }
  isActive() {
    if (this.currentUser.isActive) this.hide = true;
  }
  getUnitOwner(id: number, index: number) {
    this._serviceCustomer.GetCustomerById(id).subscribe((c) => {
      this.unitOwners[index] = c;
    });
  }
}
