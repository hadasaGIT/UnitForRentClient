import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Customer2 } from 'src/app/modules/customer/models/customer2.model';
import { customerService } from 'src/app/modules/customer/services/customer.service';
import { HousingUnit } from '../../_models/housing-unit.model';
import { HousingUnitService } from '../../_services/housing-unit.service';

@Component({
  selector: 'app-housing-unit-details',
  templateUrl: './housing-unit-details.component.html',
  styleUrls: ['./housing-unit-details.component.css'],
})
export class HousingUnitDetailsComponent implements OnInit {
  constructor(
    private _serviceHousingUnit: HousingUnitService,
    private route: ActivatedRoute,
    private _customerService: customerService
  ) {}
  imageArray: string[] = [
    '../../../../assets/img/home_img.png',
    '../../../../assets/img/3d-render-house-countryside.jpg',
    '../../../../assets/img/publish_2.jpg',
    '../../../../assets/img/login_img.png',
    '../../../../assets/img/publish.jpg',
    '../../../../assets/img/publishPage.jpg',
  ];
  index: number = 0;
  imageToShow: string = this.imageArray[0];
  currentUser:Customer2;
  currentHousingUnit: HousingUnit;
  currentHousingUnitId: number;
  unitOwner: Customer2;
  phonNumber1: string;
  phonNumber: string;
  hide: boolean = false;

  emailUnitOwner: string;

  ngOnInit(): void {
    this.route.params.subscribe(
      (p) => (this.currentHousingUnitId = p.housingUnitId)
    );
    this.GetHousingUnitById(this.currentHousingUnitId);
    this.getCustomerById();
  }
  GetHousingUnitById(id: number) {
    this._serviceHousingUnit.GetHousingUnitById(id).subscribe((res) => {
      this.currentHousingUnit = res;
      this.getUnitOwner(this.currentHousingUnit.unitOwnersId);
    });
  }
  prev() {
    this.index = this.index <= 0 ? this.imageArray.length - 1 : this.index - 1;
    this.imageToShow = this.imageArray[this.index];
    console.log('prev');
    console.log(this.imageToShow);
    console.log(this.index);
  }

  next() {
    this.index = this.index >= this.imageArray.length - 1 ? 0 : this.index + 1;
    this.imageToShow = this.imageArray[this.index];
    console.log('next');
    console.log(this.imageToShow);
    console.log(this.index);
  }
  currentSlide(index: number) {
    this.index = index;
    this.imageToShow = this.imageArray[index];
  }
  getUnitOwner(id: number) {
    this._customerService.GetCustomerById(id).subscribe((c) => {
      this.unitOwner = c;
      this.phonNumber = 'https://wa.me/' + this.unitOwner.phon1;

      this.emailUnitOwner = 'mailto:' + this.unitOwner.email;
    });
  }
  getCustomerById(){
    this._customerService.GetCustomerById(this._customerService.customerId).subscribe((customer)=>{
      this.currentUser= customer;
    })
  }
  //check the customer have access
  isActive(){
    if(this.currentUser.isActive)
      this.hide=true;
    console.log(this.currentUser)
    }
    
}

