import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Customer } from '../../models/customer.model';
import { Customer2 } from '../../models/customer2.model';
import { customerService } from '../../services/customer.service';

@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.css'],
})
export class CustomerInfoComponent implements OnInit {
  customerById: Customer2;
  customerId: number;
  updateForm: FormGroup;
  updateSuccess: boolean = false;
  public hide: boolean = true;

  //constructor
  constructor(
    private _customerService: customerService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) {}

  //ng_on_init
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
      this.initForm();
    });
  }
  //init form with current user-info
  initForm() {
    this.updateForm = this.fb.group({
      id: [this.customerById.id],
      isActive: [this.customerById.isActive],
      frequencyUpdate: [this.customerById.frequencyUpdate],
      lastUpdatedDate: [this.customerById.lastUpdatedDate],
      firstName: [this.customerById.firstName, Validators.required],
      lastName: [this.customerById.lastName, Validators.required],
      email: [this.customerById.email, [Validators.required, Validators.email]],
      phon1: [this.customerById.phon1, Validators.required],
      phon2: [this.customerById.phon2, []],
      password: [
        this.customerById.password,
        [Validators.required, Validators.minLength(5)],
      ],
    });
  }
  //update the current user-info
  update() {
    if (this.isChanges()) {
      this.updateSuccess = false;
      this.customerById = this.updateForm.value;
      try {
        console.log(this.customerById);
        this._customerService
          .UpdateCustomer(this.customerById, this.customerId)
          .subscribe((data) => {
            this.initForm();
            this._snackBar.open('העדכון בוצע בהצלחה!', '  ', {
              duration: 3000,
            });
          });
      } catch (err) {
        console.log('oops!! error in update');
      }
    } else {
      this._snackBar.open('לא נעשו שינויים!', ' ', { duration: 3000 });
    }
  }
  isChanges(): boolean {
    if (
      this.updateForm.get('firstName')!.value == this.customerById.firstName &&
      this.updateForm.get('lastName')!.value == this.customerById.lastName &&
      this.updateForm.get('email')!.value == this.customerById.email &&
      this.updateForm.get('password')!.value == this.customerById.password &&
      this.updateForm.get('phon1')!.value == this.customerById.phon1 &&
      this.updateForm.get('phon2')!.value == this.customerById.phon2
    ) {
      return false;
    }
    return true;
  }
  undoChanges() {
    if (this.isChanges()) {
      this.initForm();
      this._snackBar.open('השינויים בוטלו!', ' ', { duration: 3000 });
    } else {
      this._snackBar.open('לא נעשו שינויים!', ' ', { duration: 3000 });
    }
    return;
  }
}
