import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { MaterialModule } from '../material.module';
import { HomeComponent } from './_components/home/home.component';
import { HousingUnitDetailsComponent } from './_components/housing-unit-details/housing-unit-details.component';
import { FurnitureLevelService } from './_services/furniture-level.service';
import { HousingUnitFullService } from './_services/housing-unit-full.service';
import { HousingUnitImageService } from './_services/housing-unit-image.service';
import { HousingUnitService } from './_services/housing-unit.service';
import { PropertyConditionService } from './_services/property-condition.service';
@NgModule({
  declarations: [HomeComponent, HousingUnitDetailsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [
    FurnitureLevelService,
    PropertyConditionService,
    HousingUnitImageService,
    HousingUnitService,
    HousingUnitFullService,
  ],
  exports: [HomeComponent],
})
export class SharedModule {}
