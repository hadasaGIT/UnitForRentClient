import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { CustomerInfoComponent } from './components/customer-info/customer-info.component';
import { HousingUnitListComponent } from './components/housing-unit-list/housing-unit-list.component';
import { HousingUnitRelevantComponent } from './components/housing-unit-relevant/housing-unit-relevant.component';
// import { PaymentComponent } from './components/payment/payment.component';
import { PersonalAreaComponent } from './components/personal-area/personal-area.component';
import { PublishHousingUnitComponent } from './components/publish-housing-unit/publish-housing-unit.component';

const CUSTOMER_ROUTES: Route[] = [
  { path: '', redirectTo: 'personal-area', pathMatch: 'full' },
  { path: 'personal-area', component: PersonalAreaComponent },
  { path: 'publish', component: PublishHousingUnitComponent },
  { path: 'customer-info', component: CustomerInfoComponent },
  { path: 'list', component: HousingUnitListComponent },
  { path: 'favorite', component: HousingUnitRelevantComponent },
  // { path: 'payment', component: PaymentComponent },
];

@NgModule({
  imports: [RouterModule.forChild(CUSTOMER_ROUTES)],
  exports: [RouterModule],
})
export class CustomerRoutingModule {}
