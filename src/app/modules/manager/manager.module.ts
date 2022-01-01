import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { PropertyConditionService } from 'src/app/shared/_services/property-condition.service';
import { AuthGuardManager } from './auth-guard-manager.service';
import { EditFurnitureLevelComponent } from './components/edit-furniture-level/edit-furniture-level.component';
import { EditPropertyConditionComponent } from './components/edit-property-condition/edit-property-condition.component';
import { ListCustomerComponent } from './components/list-customer/list-customer.component';
import { MainManagerComponent } from './components/main-manager/main-manager.component';
import { ManagerRoutingModule } from './manager-routing.module';
import { CustomerService } from './services/customer.service';
import { managerService } from './services/manager.service';

@NgModule({
  declarations: [
    MainManagerComponent,
    ListCustomerComponent,
    EditPropertyConditionComponent,
    EditFurnitureLevelComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ManagerRoutingModule,
    MaterialModule,
  ],
  providers: [AuthGuardManager, CustomerService, managerService],
})
export class ManagerModule {}
