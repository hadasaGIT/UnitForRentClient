import { Component, OnInit } from '@angular/core';
import { observable, Observable } from 'rxjs';
import { PropertyCondition } from 'src/app/shared/_models/propery-condition.model';
import { PropertyConditionService } from 'src/app/shared/_services/property-condition.service';

@Component({
  selector: 'app-edit-property-condition',
  templateUrl: './edit-property-condition.component.html',
  styleUrls: ['./edit-property-condition.component.css']
})
export class EditPropertyConditionComponent implements OnInit {
  propertyConditionsList: Observable<PropertyCondition[]>
  newPropertyConditon?: PropertyCondition = undefined
  constructor(private _propertyConditionServcie: PropertyConditionService) { }

  deletePropertyCondition(id: number) {
    this._propertyConditionServcie.deletePropertyCondition(id).subscribe(() => {
      this.propertyConditionsList = this._propertyConditionServcie.getAllPropertyConditions()
    }, () => alert('המחיקה לא אושרה')
    );
  }

  saveChanges(propertyCpndition: PropertyCondition, condition: string) {
    propertyCpndition.condition = condition
    this._propertyConditionServcie.updatePropertyCondition(propertyCpndition).subscribe(() =>
      this.propertyConditionsList = this._propertyConditionServcie.getAllPropertyConditions()
      , () => alert('השינוי לא אושר')
    );
  }

  openNewListItem() {
    this.newPropertyConditon = new PropertyCondition
  }

  addPropertyCondition(_condition: string) {
    this.newPropertyConditon = { id: 0, condition: _condition }
    this._propertyConditionServcie.addPropertyCondition(this.newPropertyConditon).subscribe(() => {
      this.propertyConditionsList = this._propertyConditionServcie.getAllPropertyConditions();
      this.newPropertyConditon = undefined
    });
  }
  ngOnInit(): void {
    this.propertyConditionsList = this._propertyConditionServcie.getAllPropertyConditions()
  }

}
