import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCustromerComponent } from './list-custromer.component';

describe('ListCustromerComponent', () => {
  let component: ListCustromerComponent;
  let fixture: ComponentFixture<ListCustromerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCustromerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCustromerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
