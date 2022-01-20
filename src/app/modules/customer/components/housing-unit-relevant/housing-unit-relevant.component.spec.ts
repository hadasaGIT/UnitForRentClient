import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HousingUnitRelevantComponent } from './housing-unit-relevant.component';

describe('HousingUnitRelevantComponent', () => {
  let component: HousingUnitRelevantComponent;
  let fixture: ComponentFixture<HousingUnitRelevantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HousingUnitRelevantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HousingUnitRelevantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
