import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AuthGuardManager } from './auth-guard-manager.service';
import { MainManagerComponent } from './components/main-manager/main-manager.component';
import { ManagerRoutingModule } from './manager-routing.module';
import { ListCustromerComponent } from './components/list-custromer/list-custromer.component';
import { MaterialModule } from 'src/app/material.module';
import { CustomerService } from './services/customer.service';
import { CustomerDetailsComponent } from './components/customer-details/customer-details.component';
import { EditPropertyConditionComponent } from './components/edit-property-condition/edit-property-condition.component';
import { PropertyConditionService } from 'src/app/shared/_services/property-condition.service';
import { EditFurnitureLevelComponent } from './components/edit-furniture-level/edit-furniture-level.component';

@NgModule({
  declarations: [
    MainManagerComponent,
    ListCustromerComponent,
    CustomerDetailsComponent,
    EditPropertyConditionComponent,
    EditFurnitureLevelComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ManagerRoutingModule,
    MaterialModule
  ],
  providers: [AuthGuardManager, CustomerService, PropertyConditionService],
})
export class ManagerModule { }
