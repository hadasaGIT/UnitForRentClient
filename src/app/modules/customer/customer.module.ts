import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { PublishHousingUnitComponent } from './components/publish-housing-unit/publish-housing-unit.component';
import { MaterialModule } from 'src/app/material.module';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from 'src/app/app-routing.module';
import {
  FormGroup,
  FormGroupName,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { PersonalAreaComponent } from './components/personal-area/personal-area.component';
import { CustomerRoutingModule } from './customer-routing.module';
import { AuthGuardCustomer } from './auth-guard-customer.service';
import { CustomerInfoComponent } from './components/customer-info/customer-info.component';
import { customerService } from './services/customer.service';
import { HousingUnitListComponent } from './components/housing-unit-list/housing-unit-list.component';
import {
  MatStepper,
  matStepperAnimations,
  MatStepperModule,
  MatStepperNext,
  MatStepperPrevious,
} from '@angular/material/stepper';
import { HousingUnitRelevantService } from './services/housing-unit-relevant.service';
import { HousingUnitRelevantComponent } from './components/housing-unit-relevant/housing-unit-relevant.component';
import { GoogleMapsModule } from '@angular/google-maps';
// import { PaymentComponent } from './components/payment/payment.component';
// import { NgxPayPalModule } from 'ngx-paypal';

@NgModule({
  declarations: [
    PublishHousingUnitComponent,
    PersonalAreaComponent,
    CustomerInfoComponent,
    HousingUnitListComponent,
    HousingUnitRelevantComponent,
    // PaymentComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    CustomerRoutingModule,
    ReactiveFormsModule,
    GoogleMapsModule,
    // NgxPayPalModule,
  ],
  exports: [PublishHousingUnitComponent, CustomerInfoComponent],
  providers: [
    AuthGuardCustomer,
    customerService,
    DatePipe,
    HousingUnitRelevantService,
  ],
})
export class CustomerModule {}
