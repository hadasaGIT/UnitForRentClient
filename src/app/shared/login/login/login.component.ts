// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
// import { Router } from '@angular/router';
// import { LoginResponse } from './models/LoginResponse.model';
// import { LoginService } from './services/login.service';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css'],
// })
// export class LoginComponent implements OnInit {
//   loginForm: FormGroup;
//   constructor(private _LoginService: LoginService, private _router: Router) {}

//   ngOnInit(): void {
//     this.loginForm = new FormGroup({
//       email: new FormControl(),
//       password: new FormControl(),
//     });
//   }
//   onSubmit() {
//     this._LoginService.login(this.loginForm.value).subscribe((data) => {
//       if (data) {
//         console.log(data);
//         // localStorage.setItem('currentUser', JSON.stringify(data));
//         // let user: LoginResponse = JSON.parse(
//         //   localStorage.getItem('currentUser')!
//         // );

//         // this._router.navigate([''])
//         // return data.UserType;
//       } else console.log('failed');
//       // return null;
//     });
//   }
// }
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Login } from './models/login.model';
import { LoginResponse } from './models/LoginResponse.model';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  log_in: Login = new Login();
  public loginInvalid: boolean;
  private formSubmitAttempt: boolean;
  constructor(
    private _LoginService: LoginService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private _router: Router,
    
  ) {}
  async ngOnInit() {
    this.form = this.fb.group({
      email: ['', Validators.email],
      password: ['', Validators.required],
    });
  }

  async login() {
    this.loginInvalid = false;
    this.formSubmitAttempt = false;
    this.log_in.Email = this.form.get('email')!.value;
    this.log_in.Password = this.form.get('password')!.value;
    if (this.form.valid) {
      try {
        this._LoginService.login(this.log_in).subscribe((data) => {
          if (data) {
            console.log(data);
            localStorage.setItem('currentUser', JSON.stringify(data));
            //גישה למשתמש הנוכחי
            let user: LoginResponse = JSON.parse(
              localStorage.getItem('currentUser')!
            );

            this._router.navigate(['../']);
          } else {
            console.log('failed');
            this.loginInvalid = true;
          }
        });
      } catch (err) {
        this.formSubmitAttempt = true;
      }
    }
  }
}
