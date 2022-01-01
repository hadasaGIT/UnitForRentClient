import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardCustomer } from './modules/customer/auth-guard-customer.service';
import { AuthGuardManager } from './modules/manager/auth-guard-manager.service';
import { HomeComponent } from './shared/_components/home/home.component';
import { HousingUnitDetailsComponent } from './shared/_components/housing-unit-details/housing-unit-details.component';
import { LoginComponent } from './shared/_components/login/login-component/login.component';
import { RegisterComponent } from './shared/_components/register/register-component/register.component';
import { SearchComponent } from './shared/_components/search/search-component/search.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'search/:address', component: SearchComponent },
  { path: 'details/:housingUnitId', component: HousingUnitDetailsComponent },
  {
    path: 'customer',
    loadChildren: () =>
      import('./modules/customer/customer.module').then(
        (m) => m.CustomerModule
      ),
    canLoad: [],
    canActivate: [AuthGuardCustomer],
  },
  {
    path: 'manager',
    loadChildren: () =>
      import('./modules/manager/manager.module').then((m) => m.ManagerModule),
    canLoad: [],
    canActivate: [AuthGuardManager],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
