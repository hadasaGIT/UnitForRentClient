import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { DatePipe, formatDate } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GoogleMap } from '@angular/google-maps';
import { ActivatedRoute, Router } from '@angular/router';
import { FurnitureLevel } from 'src/app/shared/_models/furniture-level.models';
import { HousingUnitImage } from 'src/app/shared/_models/housing-unit-image.model';
import { HousingUnit } from 'src/app/shared/_models/housing-unit.model';
import { PropertyCondition } from 'src/app/shared/_models/property-condition.model';
import { FurnitureLevelService } from 'src/app/shared/_services/furniture-level.service';
import { HousingUnitImageService } from 'src/app/shared/_services/housing-unit-image.service';
import { HousingUnitService } from 'src/app/shared/_services/housing-unit.service';
import { PropertyConditionService } from 'src/app/shared/_services/property-condition.service';
import { customerService } from '../../services/customer.service';

@Component({
  selector: 'app-publish-housing-unit',
  templateUrl: './publish-housing-unit.component.html',
  styleUrls: ['./publish-housing-unit.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
  ],
})
export class PublishHousingUnitComponent implements OnInit {
  publishForm: FormGroup;
  imageForm: FormGroup;
  listFurnitureLevel: FurnitureLevel[];
  listPropertyConditions: PropertyCondition[];
  HousingUnitToPublish: HousingUnit = new HousingUnit();
  public publishInvalid: boolean;
  private formSubmitAttempt: boolean;
  images: HousingUnitImage[] = [
    {
      Id: 0,
      housingUnitId: 0,
      image: '../../../../../assets/img/imageHead.png',
    },
    { Id: 1, housingUnitId: 0, image: '../../../../../assets/img/LOGO.jpg' },
    { Id: 2, housingUnitId: 0, image: '../../../../../assets/img/LOGO.jpg' },
    { Id: 3, housingUnitId: 0, image: '../../../../../assets/img/LOGO.jpg' },
    { Id: 4, housingUnitId: 0, image: '../../../../../assets/img/LOGO.jpg' },
    { Id: 5, housingUnitId: 0, image: '../../../../../assets/img/LOGO.jpg' },
    { Id: 6, housingUnitId: 0, image: '../../../../../assets/img/LOGO.jpg' },
    { Id: 7, housingUnitId: 0, image: '../../../../../assets/img/LOGO.jpg' },
    { Id: 8, housingUnitId: 0, image: '../../../../../assets/img/LOGO.jpg' },
    { Id: 9, housingUnitId: 0, image: '../../../../../assets/img/LOGO.jpg' },
  ];
  isEditable = false;
  idToImage: number = 0;
  private _searchLat: number;
  private _searchLng: number;

  @ViewChild('mapSearchField') searchField: ElementRef;
  @ViewChild(GoogleMap) googleMap: GoogleMap;

  ngAfterViewInit() {
    const searchBox = new google.maps.places.SearchBox(
      this.searchField.nativeElement
    );
    console.log(searchBox);
    console.log(this.searchField.nativeElement);
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
      // this.googleMap.fitBounds(bounds);
    });
  }
  constructor(
    private _serviceFurnitureLevel: FurnitureLevelService,
    private _serviceHousingUnit: HousingUnitService,
    private _servicePropertyCondition: PropertyConditionService,
    private _serviceHousingUnitImage: HousingUnitImageService,
    private _customerService: customerService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private _router: Router,
    public datePipe: DatePipe
  ) {}
  async ngOnInit() {
    this.getFurnitureLevel();
    this.getPropertyCondition();
    this.publishForm = this.fb.group({
      address: [, Validators.required],
      area: [, Validators.required],
      floor: [, Validators.required],
      floorsBuilding: [, []],
      price: [, Validators.required],
      roomsNum: [, Validators.required],
      description: [, [Validators.required, Validators.max(425)]],
      occupancyDate: [, Validators.required],
      parking: [false, []],
      securityRoom: [false, []],
      accessForDisabled: [false, []],
      elevator: [false, []],
      terrace: [false, []],
      solarHeater: [false, []],
      airConditioning: [false, []],
      pandorDoors: [false, []],
      animal: [false, []],
      furniture: [, Validators.required],
      propertyCondition: [, Validators.required],
      propertyTax: [, []],
      committeeHome: [, []],
      payment: [0, []],
      flexible: [false, []],
      partners: [false, []],
      warehouse: [false, []],
      longTerm: [false, []],
      kosherKitchen: [false, []],
      bars: [false, []],
      evacuationDate: [, []],
    });
  }
  getFurnitureLevel() {
    this._serviceFurnitureLevel.getAllFurnitureLevels().subscribe((res) => {
      this.listFurnitureLevel = res;
    });
  }
  getPropertyCondition() {
    this._servicePropertyCondition
      .getAllPropertyConditions()
      .subscribe((res) => {
        this.listPropertyConditions = res;
      });
  }

  publish() {
    this.publishInvalid = false;
    this.formSubmitAttempt = false;
    if (this.publishForm.valid) {
      this.HousingUnitToPublish.accessForDisabled =
        this.publishForm.get('accessForDisabled')!.value;
      this.HousingUnitToPublish.airConditioning =
        this.publishForm.get('airConditioning')!.value;
      this.HousingUnitToPublish.animal = this.publishForm.get('animal')!.value;
      this.HousingUnitToPublish.area = this.publishForm.get('area')!.value;
      this.HousingUnitToPublish.address =
        this.publishForm.get('address')!.value;
      this.HousingUnitToPublish.description =
        this.publishForm.get('description')!.value;
      this.HousingUnitToPublish.elevator =
        this.publishForm.get('elevator')!.value;
      //לבדוק אם צריך את זה
      this.HousingUnitToPublish.evacuationDate =
        this.publishForm.get('evacuationDate')!.value;
      this.HousingUnitToPublish.floor = this.publishForm.get('floor')!.value;
      this.HousingUnitToPublish.furniture = Number(
        this.publishForm.get('furniture')!.value
      );
      // let formattedDt = formatDate(
      //   this.publishForm.get('occupancyDate')!.value,
      //   'yyyy-MM-dd hh:mm:ssZZZZZ',
      //   'en_US'
      // );
      this.HousingUnitToPublish.occupancyDate =
        this.publishForm.get('occupancyDate')!.value;
      this.HousingUnitToPublish.pandorDoors =
        this.publishForm.get('pandorDoors')!.value;
      this.HousingUnitToPublish.parking =
        this.publishForm.get('parking')!.value;
      this.HousingUnitToPublish.price = this.publishForm.get('price')!.value;
      this.HousingUnitToPublish.propertyCondition = Number(
        this.publishForm.get('propertyCondition')!.value
      );
      this.HousingUnitToPublish.publishDate = new Date();
      this.HousingUnitToPublish.relevant = true;
      this.HousingUnitToPublish.roomsNum =
        this.publishForm.get('roomsNum')!.value;
      this.HousingUnitToPublish.securityRoom =
        this.publishForm.get('securityRoom')!.value;
      this.HousingUnitToPublish.solarHeater =
        this.publishForm.get('solarHeater')!.value;
      this.HousingUnitToPublish.terrace =
        this.publishForm.get('terrace')!.value;
      this._customerService.getCustomerId();
      this.HousingUnitToPublish.unitOwnersId = this._customerService.customerId;
      this.HousingUnitToPublish.viewsNum = 0;
      this.HousingUnitToPublish.lat = this._searchLat;
      this.HousingUnitToPublish.lng = this._searchLng;
      this.HousingUnitToPublish.evacuationDate = new Date();
      console.log(this.HousingUnitToPublish);
      try {
        console.log(this.HousingUnitToPublish);
        this._serviceHousingUnit
          .AddHousingUnit(this.HousingUnitToPublish)
          .subscribe((data) => {
            this.saveImages(data);
          });
      } catch (err) {
        console.log('error');
        this.formSubmitAttempt = true;
      }
    }
  }

  base64: string | ArrayBuffer | null;
  uploadFile(fileInput: any) {
    try {
      let reader = new FileReader();
      reader.readAsDataURL(fileInput.files[0]);
      reader.onload = () => {
        this.base64 = reader.result;
        if (this.base64 && this.idToImage > -1) {
          this.images[this.idToImage].image = this.base64.toString();
        }
      };
    } catch (e) {}
  }
  addImage(id: number) {
    this.idToImage = id;
  }
  removeImage(id: number) {
    this.images[id].image =
      id == 0
        ? '../../../../../assets/img/imageHead.png'
        : '../../../../../assets/img/LOGO.jpg';
  }
  saveImages(id: number) {
    this.images.forEach((image) => {
      if (
        image.image != '../../../../../assets/img/imageHead.png' &&
        image.image != '../../../../../assets/img/LOGO.jpg'
      ) {
        image.housingUnitId = id;
        image.Id = 0;
        this._serviceHousingUnitImage
          .AddHousingUnitImage(image)
          .subscribe((image) => {});
      }
    });
  }
}
