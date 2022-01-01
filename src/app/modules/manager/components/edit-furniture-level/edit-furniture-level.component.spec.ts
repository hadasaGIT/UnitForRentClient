import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFurnitureLevelComponent } from './edit-furniture-level.component';

describe('EditFurnitureLevelComponent', () => {
  let component: EditFurnitureLevelComponent;
  let fixture: ComponentFixture<EditFurnitureLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFurnitureLevelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFurnitureLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
