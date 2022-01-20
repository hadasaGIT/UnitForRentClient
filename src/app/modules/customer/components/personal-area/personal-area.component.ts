import { Component, OnInit } from '@angular/core';
import { Customer } from '../../models/customer.model';
import { Customer2 } from '../../models/customer2.model';
import { customerService } from '../../services/customer.service';

@Component({
  selector: 'app-personal-area',
  templateUrl: './personal-area.component.html',
  styleUrls: ['./personal-area.component.css'],
})
export class PersonalAreaComponent implements OnInit {
  constructor(private _customerService: customerService) {}
  customerById: Customer2;
  customerId: number;
  ngOnInit(): void {
    this._customerService.getCustomerId();
    this.customerId = this._customerService.customerId;
    this.GetCustomerById();
  }
  //return current user-info
  GetCustomerById() {
    this._customerService.GetCustomerById(this.customerId).subscribe((data) => {
      console.log(data);
      this.customerById = data;
    });
  }
}
