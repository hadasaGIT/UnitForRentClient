import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishHousingUnitComponent } from './publish-housing-unit.component';

describe('PublishHousingUnitComponent', () => {
  let component: PublishHousingUnitComponent;
  let fixture: ComponentFixture<PublishHousingUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublishHousingUnitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishHousingUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
