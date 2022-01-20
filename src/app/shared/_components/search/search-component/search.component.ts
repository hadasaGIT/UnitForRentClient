import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { GoogleMap } from '@angular/google-maps';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Customer2 } from 'src/app/modules/customer/models/customer2.model';
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
  customerId = this._serviceCustomer.customerId;
  searchParams: Search = new Search();
  address: string;
  listHousingUnit: HousingUnitFull[];
  panelOpenState = false;
  listPropertyConditions: PropertyCondition[];
  listFurnitureLevel: FurnitureLevel[];
  open: boolean = false;
  valueDescription = '';
  housingUnitRelevant?: HousingUnitRelevant = undefined;

  @ViewChild('mapSearchField') searchField: ElementRef;
  @ViewChild(GoogleMap) googleMap: GoogleMap;
  private _searchLat: number;
  private _searchLng: number;
  currentUser: Customer2;
  unitOwners: Customer2[] = [];
  hide: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private _router: Router,
    private _service: SearchService,
    private _serviceCustomer: customerService,
    private _serviceHousingUnitRelevant: HousingUnitRelevantService,
    private _servicePropertyCondition: PropertyConditionService,
    private _serviceFurnitureLevel: FurnitureLevelService,
    private _snackBar: MatSnackBar,
    private _app: AppComponent
  ) {}

  ngOnInit() {
    this.route.params.subscribe((p) => (this.address = p.address));
    console.log(this.address);
    this.initForm(new Search());
    this.search();
    this.getPropertyCondition();
    this.getFurnitureLevel();
    this.getCustomerById();
  }
  ngAfterViewInit() {
    console.log(this.googleMap, this.searchField);
    const searchBox = new google.maps.places.SearchBox(
      this.searchField.nativeElement
    );
    searchBox.addListener('places_changed', () => {
      const places = searchBox.getPlaces();
      if (places.length === 0) {
        return;
      }
      const bounds = new google.maps.LatLngBounds();
      places.forEach((place) => {
        if (!place.geometry || !place.geometry?.location) {
          return;
        }
        this._searchLat = place.geometry.location.lat();
        this._searchLng = place.geometry.location.lng();
        if (place.geometry.viewport) {
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      this.googleMap.fitBounds(bounds);
    });
    this.search();
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
  search() {
    this.searchParams = this.formSearch.value;
    this.searchParams.customersId = this._serviceCustomer.customerId;
    this.searchParams.lat = this._searchLat;
    this.searchParams.lng = this._searchLng;
    console.log(this.searchParams.lat, this.searchParams.lng);
    if ((this.searchParams.address = '')) {
      this.searchParams.lat = null;
      this.searchParams.lng = null;
    }
    console.log(this.searchParams);
    this._service.search(this.searchParams).subscribe((res) => {
      this.listHousingUnit = res;
      let index = 0;
      this.listHousingUnit.forEach((element) => {
        this.getUnitOwner(element.housingUnit.unitOwnersId, index++);
      });
      console.log(this.listHousingUnit);
    });
  }

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
            this.housingUnitRelevant = undefined;
            this.search();
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
          this.search();
          this._app.numFavorite -= 1;
        });
    } catch (err) {
      this._snackBar.open('אופסס, קרתה תקלה בשרת, נסה שוב!', '  ', {
        duration: 2000,
      });
    }
  }

  initForm(search: Search): void {
    this.formSearch = new FormGroup({
      SearchId: new FormControl(search.searchId),
      CustomersId: new FormControl(search.customersId),
      UnitOwnersId: new FormControl(search.unitOwnersId),
      PropertyCondition: new FormControl(search.propertyCondition),
      Furniture: new FormControl(search.furniture),
      DateSearch: new FormControl(search.dateSearch),
      //תאריך פינוי
      EvacuationDate: new FormControl(search.evacuationDate),
      PublishDate: new FormControl(search.publishDate),
      Address: new FormControl(search.address || this.address),
      Description: new FormControl(search.description),
      //ok
      FromFloor: new FormControl(search.fromFloor),
      ToFloor: new FormControl(search.toFloor),
      FromArea: new FormControl(search.fromArea),
      ToArea: new FormControl(search.toArea),
      MinRoomsNum: new FormControl(search.minRoomsNum),
      MaxRoomsNum: new FormControl(search.maxRoomsNum),
      MinPrice: new FormControl(search.minPrice),
      MaxPrice: new FormControl(search.maxPrice),
      ViewsNum: new FormControl(search.viewsNum),
      Relevant: new FormControl(search.relevant),
      Parking: new FormControl(search.parking),
      PandorDoors: new FormControl(search.pandorDoors),
      SolarHeater: new FormControl(search.solarHeater),
      AirConditioning: new FormControl(search.airConditioning),
      AccessForDisabled: new FormControl(search.accessForDisabled),
      Animal: new FormControl(search.animal),
      SecurityRoom: new FormControl(search.securityRoom),
      Elevator: new FormControl(search.elevator),
      Terrace: new FormControl(search.terrace),
      floorsBuilding: new FormControl(search.floorsBuilding),
      propertyTax: new FormControl(search.propertyTax),
      committeeHome: new FormControl(search.committeeHome),
      payment: new FormControl(search.payment),
      flexible: new FormControl(search.flexible),
      partners: new FormControl(search.partners),
      warehouse: new FormControl(search.warehouse),
      longTerm: new FormControl(search.longTerm),
      kosherKitchen: new FormControl(search.kosherKitchen),
      bars: new FormControl(search.bars),
    });
  }
  openFilter() {
    this.open = !this.open;
    console.log(this.open);
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
