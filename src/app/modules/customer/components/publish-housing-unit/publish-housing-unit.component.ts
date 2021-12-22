import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FurnitureLevel } from 'src/app/shared/_models/furniture-level.models';
import { HousingUnit } from 'src/app/shared/_models/housing-unit.model';
import { PropertyCondition } from 'src/app/shared/_models/propery-condition.model';
import { FurnitureLevelService } from 'src/app/shared/_services/furniture-level.service';
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
  images: string[] = ['', '', '', '', '', '', '', '', '', ''];
  isEditable = false;
  loop: number = 0;

  constructor(
    private _serviceFurnitureLevel: FurnitureLevelService,
    private _serviceHousingUnit: HousingUnitService,
    private _servicePropertyCondition: PropertyConditionService,
    private _customerService: customerService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private _router: Router,
    public datepipe: DatePipe
  ) {}
  async ngOnInit() {
    this.getFurnitureLevel();
    this.getPropertyCondition();
    this.publishForm = this.fb.group({
      address: ['', Validators.required],
      area: ['', Validators.required],
      floor: ['', Validators.required],
      price: ['', Validators.required],
      roomsNum: ['', Validators.required],
      description: ['', [Validators.required, Validators.max(425)]],
      occupancyDate: ['', Validators.required],
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
    });
  }
  getFurnitureLevel() {
    this._serviceFurnitureLevel.getAllFurnitureLevels().subscribe((res) => {
      console.log(res);
      this.listFurnitureLevel = res;
    });
  }
  getPropertyCondition() {
    this._servicePropertyCondition
      .getAllPropertyConditions()
      .subscribe((res) => {
        console.log(res);
        this.listPropertyConditions = res;
      });
  }

  publish() {
    this.publishInvalid = false;
    this.formSubmitAttempt = false;
    if (this.publishForm.valid) {
      console.log(this.HousingUnitToPublish);
      this.HousingUnitToPublish.accessForDisabled =
        this.publishForm.get('accessForDisabled')!.value;
      this.HousingUnitToPublish.airConditioning =
        this.publishForm.get('airConditioning')!.value;
      this.HousingUnitToPublish.animal = this.publishForm.get('animal')!.value;
      this.HousingUnitToPublish.area = this.publishForm.get('area')!.value;
      this.HousingUnitToPublish.city = this.publishForm.get('address')!.value;
      this.HousingUnitToPublish.description =
        this.publishForm.get('description')!.value;
      this.HousingUnitToPublish.elevator =
        this.publishForm.get('elevator')!.value;
      //לבדוק אם צריך את זה
      // this.HousingUnitToPublish.evacuationDate =
      //   this.publishForm.get('evacuationDate')!.value;
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
      this.HousingUnitToPublish.unitOwnersId = this._customerService.customerId;
      this.HousingUnitToPublish.viewsNum = 0;
      console.log(this.HousingUnitToPublish);
      try {
        console.log(this.HousingUnitToPublish);
        this._serviceHousingUnit
          .AddHousingUnit(this.HousingUnitToPublish)
          .subscribe((data) => {});
      } catch (err) {
        console.log('error');
        this.formSubmitAttempt = true;
      }
    }
  }

  base64: string | ArrayBuffer | null;
  uploadFile(fileInput: any) {
    console.log(fileInput.files[0]);
    let reader = new FileReader();
    reader.readAsDataURL(fileInput.files[0]);
    reader.onload = () => {
      console.log(reader.result);
      this.base64 = reader.result;
      if (this.base64) 
        this.images[this.loop++] = this.base64.toString();
    };
  }
}
