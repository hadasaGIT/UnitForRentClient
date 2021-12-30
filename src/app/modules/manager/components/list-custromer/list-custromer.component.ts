import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Customer } from 'src/app/shared/_models/customer.model';
import { CustomerService } from '../../services/customer.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-list-custromer',
  templateUrl: './list-custromer.component.html',
  styleUrls: ['./list-custromer.component.css']
})
export class ListCustromerComponent implements AfterViewInit {
  customersList: MatTableDataSource<Customer>;

  ngAfterViewInit() {
    this._customerService.GetAllCustomers().subscribe(data => {
      this.customersList = new MatTableDataSource<Customer>(data)
      this.customersList.paginator = this.paginator;
      this.customersList.sort = this.sort;
      console.log(data)
    });
  }


  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'phon1', 'delete'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.customersList.filter = filterValue.trim().toLowerCase();

    if (this.customersList.paginator) {
      this.customersList.paginator.firstPage();
    }
  }


  deleteCustomer(customerId: number | undefined) {
    if (customerId)
      this._customerService.deleteCustomer(customerId).subscribe(() => {
        this._customerService.GetAllCustomers().subscribe(data => {
          this.customersList = new MatTableDataSource<Customer>(data)
        });
      }, () => alert('ארעה שגיאה במחיקת הלקוח'))
  }


  constructor(private _customerService: CustomerService) { }

}
