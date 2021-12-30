import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  formSearch: FormGroup;

  address: string;

  ngOnInit() {
    this.formSearch = new FormGroup({
      address: new FormControl(),
    });
  }
  constructor(private _router: Router) {}

  search() {
    let dataForm = this.formSearch.value;
    this.address = dataForm.address || '';
    console.log(this.address);
    this._router.navigate(['../search', this.address]);
  }
  
}
