import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { AppRoutingModule } from '../app-routing.module';
import { MaterialModule } from '../material.module';
import { HomeComponent } from './_components/home/home.component';
import { HousingUnitDetailsComponent } from './_components/housing-unit-details/housing-unit-details.component';
import { AnswerService } from './_services/answer.service';
import { FeedbackService } from './_services/feadback.service';
import { FurnitureLevelService } from './_services/furniture-level.service';
import { HousingUnitFullService } from './_services/housing-unit-full.service';
import { HousingUnitImageService } from './_services/housing-unit-image.service';
import { HousingUnitService } from './_services/housing-unit.service';
import { PropertyConditionService } from './_services/property-condition.service';
import { QuestionService } from './_services/question.service';
@NgModule({
  declarations: [HomeComponent, HousingUnitDetailsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    AppRoutingModule,
    GoogleMapsModule,
  ],
  providers: [
    FurnitureLevelService,
    PropertyConditionService,
    HousingUnitImageService,
    HousingUnitService,
    HousingUnitFullService,
    QuestionService,
    AnswerService,
    FeedbackService,
  ],
  exports: [HomeComponent],
})
export class SharedModule {}
