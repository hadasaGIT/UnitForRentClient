import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/modules/customer/models/customer.model';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  private formSubmitAttempt: boolean;
  hide = true;
  account: Customer = new Customer();
  //
  constructor(
    private _RegisterService: RegisterService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private _router: Router
  ) {}
  //לא עובד המינימום..
  async ngOnInit() {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phon1: ['', Validators.required],
      phon2: ['', []],
      //usernames: [this.registerForm.controls.email, []],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.min(8)]],
    });
  }
  async register() {
    this.formSubmitAttempt = false;
    this.account.Email = this.registerForm.get('email')!.value;
    this.account.Password = this.registerForm.get('password')!.value;
    this.account.FirstName = this.registerForm.get('firstName')!.value;
    this.account.LastName = this.registerForm.get('lastName')!.value;
    this.account.Phon1 = this.registerForm.get('phon1')!.value;
    this.account.Phon2 = this.registerForm.get('phon2')!.value;
    this.account.IsActive = true;

    if (this.registerForm.valid) {
      try {
        this._RegisterService
          .registerCustomer(this.account)
          .subscribe((data) => {
            console.log('Register OK');
          });
      } catch (err) {
        this.formSubmitAttempt = true;
      }
    }
  }
}
