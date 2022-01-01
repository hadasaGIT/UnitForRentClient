import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HousingUnitRelevant } from 'src/app/modules/customer/models/housing-unit-relevant.model';
import { customerService } from 'src/app/modules/customer/services/customer.service';
import { HousingUnitRelevantService } from 'src/app/modules/customer/services/housing-unit-relevant.service';
import { FurnitureLevel } from 'src/app/shared/_models/furniture-level.models';
import { HousingUnitFull } from 'src/app/shared/_models/housing-unit-full.model';
import { PropertyCondition } from 'src/app/shared/_models/property-condition.model';
import { FurnitureLevelService } from 'src/app/shared/_services/furniture-level.service';
import { HousingUnitFullService } from 'src/app/shared/_services/housing-unit-full.service';
import { HousingUnitImageService } from 'src/app/shared/_services/housing-unit-image.service';
import { PropertyConditionService } from 'src/app/shared/_services/property-condition.service';
import { HousingUnit } from '../../../_models/housing-unit.model';
import { Search } from './../models/search.model';
import { SearchService } from './../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  formSearch: FormGroup;
  searchParams: Search = new Search();
  address: string;
  listHousingUnit: HousingUnit[];
  panelOpenState = false;
  listPropertyConditions: PropertyCondition[];
  listFurnitureLevel: FurnitureLevel[];
  open: boolean = false;
  valueDescription = '';
  // mapHousingUnitImage: Map<HousingUnit, string> = new Map<
  //   HousingUnit,
  //   string
  // >();

  // title = 'autoCompleteGoogleMaps';
  // lat = 51.678418;
  // lng = 7.809007;

  constructor(
    private route: ActivatedRoute,
    private _service: SearchService,
    private _serviceHousingUnitImage: HousingUnitImageService,
    private _serviceCustomer: customerService,
    private _serviceHousingUnitRelevant: HousingUnitRelevantService,
    private _serviceHousingUnitFull: HousingUnitFullService,
    private _servicePropertyCondition: PropertyConditionService,
    private _serviceFurnitureLevel: FurnitureLevelService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((p) => (this.address = p.address));
    console.log(this.address);
    this.initForm(new Search());
    this.search();
    this.getPropertyCondition();
    this.getFurnitureLevel();
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
  search() {
    this.searchParams = this.formSearch.value;
    this.searchParams.CustomersId=this._serviceCustomer.customerId
    console.log(this.searchParams);
    this._service.search(this.searchParams).subscribe((res) => {
      this.listHousingUnit = res;
      console.log(this.listHousingUnit);
      this._serviceHousingUnitFull.GetHousingUnitFull(res);
      // this.listHousingUnit.forEach((element) => {
      //   this._serviceHousingUnitImage
      //     .GetHousingUnitImageById(Number(element.id))
      //     .subscribe((image) => {
      //       this.mapHousingUnitImage.set(element, image.images);
      //       console.log(this.mapHousingUnitImage);
      //     });
      // });
      //להחזיר מהשרת מערך של פולים לפי הרז.
    });
  }
  isFavorite(id: string) {
    // console.log(this._serviceHousingUnitRelevant.listHousingUnitRelevant);
    // console.log(this._serviceHousingUnitRelevant.isRelevantById(Number(id)));
    return this._serviceHousingUnitRelevant.isRelevantById(Number(id));
  }
  addFavorite(id: string) {}
  removeFavorite(id: string) {}

  initForm(search: Search): void {
    this.formSearch = new FormGroup({
      SearchId: new FormControl(search.SearchId),
      CustomersId: new FormControl(search.CustomersId),
      UnitOwnersId: new FormControl(search.UnitOwnersId),
      PropertyCondition: new FormControl(search.PropertyCondition),
      Furniture: new FormControl(search.Furniture),
      DateSearch: new FormControl(search.DateSearch),
      //תאריך פינוי
      EvacuationDate: new FormControl(search.EvacuationDate),
      PublishDate: new FormControl(search.PublishDate),
      City: new FormControl(search.City || this.address),
      Neighborhood: new FormControl(search.Neighborhood),
      Street: new FormControl(search.Street),
      Description: new FormControl(search.Description),
      Number: new FormControl(search.Number),
      //ok
      FromFloor: new FormControl(search.FromFloor),
      ToFloor: new FormControl(search.ToFloor),
      FromArea: new FormControl(search.FromArea),
      ToArea: new FormControl(search.ToArea),
      MinRoomsNum: new FormControl(search.MinRoomsNum),
      MaxRoomsNum: new FormControl(search.MaxRoomsNum),
      MinPrice: new FormControl(search.MinPrice),
      MaxPrice: new FormControl(search.MaxPrice),

      ViewsNum: new FormControl(search.ViewsNum),
      Relevant: new FormControl(search.Relevant),
      Parking: new FormControl(search.Parking),
      PandorDoors: new FormControl(search.PandorDoors),
      SolarHeater: new FormControl(search.SolarHeater),
      AirConditioning: new FormControl(search.AirConditioning),
      AccessForDisabled: new FormControl(search.AccessForDisabled),
      Animal: new FormControl(search.Animal),
      SecurityRoom: new FormControl(search.SecurityRoom),
      Elevator: new FormControl(search.Elevator),
      Terrace: new FormControl(search.Terrace),
    });
  }
  openFilter() {
    this.open = !this.open;
    console.log(this.open);
  }
}
// <!--<mat-checkbox class="m-1" formControlName="Parking"> חניה</mat-checkbox>
// <mat-checkbox formControlName="PandorDoors"> דלתות פנדור</mat-checkbox>
// <mat-checkbox formControlName="SolarHeater"> דוד שמש</mat-checkbox>
// <mat-checkbox formControlName="AirConditioning">
//   מיזוג אוויר</mat-checkbox
// >
// <mat-checkbox formControlName="AccessForDisabled">
//   גישה לנכים</mat-checkbox
// >
// <mat-checkbox formControlName="Animal"> בעלי חיים</mat-checkbox> -->
// <!--חנייה-->
// <input
//   mdbCheckbox
//   type="checkbox"
//   class="btn-check"
//   id="Parking"
//   autocomplete="off"
//   formControlName="Parking"
// />
// <label class="btn btn-outline-primary m-1" for="Parking"
//   >חנייה<mat-icon> local_parking</mat-icon></label
// >
// <!--ממ"ד-->
// <input
//   mdbCheckbox
//   type="checkbox"
//   class="btn-check"
//   id="SecurityRoom"
//   autocomplete="off"
//   formControlName="SecurityRoom"
// />
// <label class="btn btn-outline-primary m-1" for="SecurityRoom"
//   >ממ"ד<mat-icon>security</mat-icon></label
// >
// <!--מחסן
// <input
//   mdbCheckbox
//   type="checkbox"
//   class="btn-check"
//   id="btn-check3"
//   autocomplete="off"
// />
// <label class="btn btn-outline-primary" for="btn-check3">מחסן</label>-->
// <!--גישה לנכים-->
// <input
//   mdbCheckbox
//   type="checkbox"
//   class="btn-check"
//   id="AccessForDisabled"
//   autocomplete="off"
//   formControlName="AccessForDisabled"
// />
// <label class="btn btn-outline-primary m-1" for="AccessForDisabled"
//   >גישה לנכים<mat-icon>accessible</mat-icon></label
// >
// <!--מעלית-->
// <input
//   mdbCheckbox
//   type="checkbox"
//   class="btn-check"
//   id="Elevator"
//   autocomplete="off"
//   formControlName="Elevator"
// />
// <label class="btn btn-outline-primary m-1" for="Elevator"
//   >מעלית<span class="material-icons">elevator</span></label
// >
// <!--מרפסת-->
// <input
//   mdbCheckbox
//   type="checkbox"
//   class="btn-check"
//   id="Terrace"
//   autocomplete="off"
//   formControlName="Terrace"
// />
// <label class="btn btn-outline-primary m-1" for="Terrace"
//   >מרפסת<span class="material-icons">balcony</span></label
// >
// <!--דוד שמש-->
// <input
//   mdbCheckbox
//   type="checkbox"
//   class="btn-check"
//   id="SolarHeater"
//   autocomplete="off"
//   formControlName="SolarHeater"
// />
// <label class="btn btn-outline-primary m-1" for="SolarHeater"
//   >דוד שמש<mat-icon>wb_sunny</mat-icon></label
// >
// <!--מיזוג אוויר-->
// <input
//   mdbCheckbox
//   type="checkbox"
//   class="btn-check"
//   id="AirConditioning"
//   autocomplete="off"
//   formControlName="AirConditioning"
// />
// <label class="btn btn-outline-primary m-1" for="AirConditioning"
//   >מיזוג אוויר<mat-icon>ac_unit</mat-icon></label
// >
// <!--דלתות פנדור-->
// <input
//   mdbCheckbox
//   type="checkbox"
//   class="btn-check"
//   id="PandorDoors"
//   autocomplete="off"
//   formControlName="PandorDoors"
// />
// <label class="btn btn-outline-primary m-1" for="PandorDoors"
//   >דלתות פנדור<span class="material-icons">sensor_door</span></label
// >
// <!--בעלי חיים-->
// <input
//   mdbCheckbox
//   type="checkbox"
//   class="btn-check"
//   id="Animal"
//   autocomplete="off"
//   formControlName="Animal"
// />
// <label class="btn btn-outline-primary m-1" for="Animal"
//   >בע"ח<img
//     class="cat"
//     src="../../../../../assets/icons/cat.jpg"
//     alt="animal"
// /></label>
