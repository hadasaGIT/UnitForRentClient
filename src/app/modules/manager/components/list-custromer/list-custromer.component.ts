import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/shared/_models/customer.model';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-list-custromer',
  templateUrl: './list-custromer.component.html',
  styleUrls: ['./list-custromer.component.css']
})
export class ListCustromerComponent implements OnInit {

  constructor(private _customerService: CustomerService) { }
  customersList: Observable<Customer[]>
  selectedCustomer?: Customer

  selectCustomer(_selectedCustomer: Customer) {
    this.selectedCustomer = _selectedCustomer
  }

  ngOnInit(): void {
    this.customersList = this._customerService.GetAllCustomers()
  }

  deleteCustomer(customerId: number | undefined) {
    if (customerId)
      this._customerService.deleteCustomer(customerId).subscribe(
        () => {
          this.customersList = this._customerService.GetAllCustomers()
          this.selectedCustomer = undefined
          alert('הלקוח נמחק בהצלחה')},
        () => alert('ארעה שגיאה במחיקת הלקוח'))
  }
}
