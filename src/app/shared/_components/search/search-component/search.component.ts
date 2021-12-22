import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HousingUnitFull } from 'src/app/shared/_models/housing-unit-full.model';
import { HousingUnitFullService } from 'src/app/shared/_services/housing-unit-full.service';
import { HousingUnitImageService } from 'src/app/shared/_services/housing-unit-image.service';
import { HousingUnit } from '../../../_models/housing-unit.model';
import { HousingUnitService } from '../../../_services/housing-unit.service';
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
  listHousingUnitFull: HousingUnitFull[] = [];
  

  // title = 'autoCompleteGoogleMaps';
  // lat = 51.678418;
  // lng = 7.809007;

  constructor(
    private route: ActivatedRoute,
    private _service: SearchService,
    private _housingUnitFullService: HousingUnitFullService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((p) => (this.address = p.address));
    console.log(this.address);
    this.initForm(new Search());
    this.search();
  }

  search() {
    this.searchParams = this.formSearch.value;
    console.log(this.searchParams);
    this._service.search(this.searchParams).subscribe((res) => {
      console.log(res);
      this.listHousingUnit = res;
      this.listHousingUnit.forEach((element) => {
        this.listHousingUnitFull.push(this._housingUnitFullService.GetHousingUnitFull(element))
      });
      console.log(this.listHousingUnitFull);
    });
  }
  favorite() {
    
  }

  // base64: string | ArrayBuffer | null = null;
  // uploadFile(fileInput: any) {
  //   console.log(fileInput.files[0]);
  //   let reader = new FileReader();
  //   reader.readAsDataURL(fileInput.files[0]);
  //   reader.onload = () => {
  //     console.log(reader.result);
  //     this.base64 = reader.result;
  //   };
  // }

  initForm(search: Search): void {
    this.formSearch = new FormGroup({
      SearchId: new FormControl(search.SearchId),
      CustomersId: new FormControl(search.CustomersId),
      UnitOwnersId: new FormControl(search.UnitOwnersId),
      PropertyCondition: new FormControl(search.PropertyCondition),
      Furniture: new FormControl(search.Furniture),
      DateSearch: new FormControl(search.DateSearch),
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
}
