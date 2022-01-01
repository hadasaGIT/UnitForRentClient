import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { EditFurnitureLevelComponent } from './components/edit-furniture-level/edit-furniture-level.component';
import { EditPropertyConditionComponent } from './components/edit-property-condition/edit-property-condition.component';
import { ListCustomerComponent } from './components/list-customer/list-customer.component';
import { MainManagerComponent } from './components/main-manager/main-manager.component';

const MANAGER_ROUTES: Route[] = [
  { path: '', redirectTo: 'manager/main-manager', pathMatch: 'full' },
  { path: 'manager/main-manager', component: MainManagerComponent },
  { path: 'manager/list-customer', component: ListCustomerComponent },
  {
    path: 'manager/property-conditions',
    component: EditPropertyConditionComponent,
  },
  { path: 'manager/furniture-levels', component: EditFurnitureLevelComponent },
];

@NgModule({
  imports: [RouterModule.forChild(MANAGER_ROUTES)],
  exports: [RouterModule],
})
export class ManagerRoutingModule {}
