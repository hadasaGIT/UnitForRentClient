import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HousingUnitDetailsComponent } from './housing-unit-details.component';

describe('HousingUnitDetailsComponent', () => {
  let component: HousingUnitDetailsComponent;
  let fixture: ComponentFixture<HousingUnitDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HousingUnitDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HousingUnitDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
