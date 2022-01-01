import { Component, OnInit } from '@angular/core';
import { observable, Observable } from 'rxjs';
import { PropertyCondition } from 'src/app/shared/_models/property-condition.model';
import { PropertyConditionService } from 'src/app/shared/_services/property-condition.service';

@Component({
  selector: 'app-edit-property-condition',
  templateUrl: './edit-property-condition.component.html',
  styleUrls: ['./edit-property-condition.component.css'],
})
export class EditPropertyConditionComponent implements OnInit {
  propertyConditionsList: Observable<PropertyCondition[]>;
  newPropertyCondition?: PropertyCondition = undefined;
  constructor(private _propertyConditionServcie: PropertyConditionService) {}

  deletePropertyCondition(id: number) {
    this._propertyConditionServcie.deletePropertyCondition(id).subscribe(
      () => {
        this.propertyConditionsList =
          this._propertyConditionServcie.getAllPropertyConditions();
      },
      () => alert('המחיקה לא אושרה')
    );
  }

  saveChanges(propertyCondition: PropertyCondition, condition: string) {
    propertyCondition.condition = condition;
    this._propertyConditionServcie
      .updatePropertyCondition(propertyCondition)
      .subscribe(
        () =>
          (this.propertyConditionsList =
            this._propertyConditionServcie.getAllPropertyConditions()),
        () => alert('השינוי לא אושר')
      );
  }

  openNewListItem() {
    this.newPropertyCondition = new PropertyCondition();
  }

  addPropertyCondition(_condition: string) {
    this.newPropertyCondition = { id: 0, condition: _condition };
    this._propertyConditionServcie
      .AddPropertyCondition(this.newPropertyCondition)
      .subscribe(() => {
        this.propertyConditionsList =
          this._propertyConditionServcie.getAllPropertyConditions();
        this.newPropertyCondition = undefined;
      });
  }
  ngOnInit(): void {
    this.propertyConditionsList =
      this._propertyConditionServcie.getAllPropertyConditions();
  }
}
