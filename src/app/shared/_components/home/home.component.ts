import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { GoogleMap } from '@angular/google-maps';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  formSearch: FormGroup;

  address: string;
  @ViewChild('mapSearchField') searchField: ElementRef;


  ngOnInit() {
    this.formSearch = new FormGroup({
      address: new FormControl(),
    });
  }
  ngAfterViewInit() {
    const searchBox = new google.maps.places.SearchBox(
      this.searchField.nativeElement
    );
  }
  constructor(private _router: Router) {}

  search() {
    let dataForm = this.formSearch.value;
    this.address = dataForm.address || '';
    console.log(this.address);
    this._router.navigate(['../search', this.address]);
  }
}
