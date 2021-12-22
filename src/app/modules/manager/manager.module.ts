import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AuthGuardManager } from './auth-guard-manager.service';
import { MainManagerComponent } from './components/main-manager/main-manager.component';
import { ManagerRoutingModule } from './manager-routing.module';

@NgModule({
  declarations: [MainManagerComponent],
  imports: [CommonModule, HttpClientModule, ManagerRoutingModule],
  providers: [AuthGuardManager],
})
export class ManagerModule {}
