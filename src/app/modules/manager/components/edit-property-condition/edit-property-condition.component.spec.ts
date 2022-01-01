import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPropertyConditionComponent } from './edit-property-condition.component';

describe('EditPropertyConditionComponent', () => {
  let component: EditPropertyConditionComponent;
  let fixture: ComponentFixture<EditPropertyConditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditPropertyConditionComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPropertyConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
