import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HousingUnitListComponent } from './housing-unit-list.component';

describe('HousingUnitListComponent', () => {
  let component: HousingUnitListComponent;
  let fixture: ComponentFixture<HousingUnitListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HousingUnitListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HousingUnitListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
