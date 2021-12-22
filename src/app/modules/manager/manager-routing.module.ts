import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { MainManagerComponent } from './components/main-manager/main-manager.component';

const MANAGER_ROUTES: Route[] = [
  { path: '', redirectTo: 'main-manager', pathMatch: 'full' },
  { path: 'main-manager', component: MainManagerComponent },
];

@NgModule({
  imports: [RouterModule.forChild(MANAGER_ROUTES)],
  exports: [RouterModule],
})
export class ManagerRoutingModule {}
