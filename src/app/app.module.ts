import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './shared/_components/login/login.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchModule } from './shared/_components/search/search.module';
import { RegisterModule } from './shared/_components/register/register.module';
import { SharedModule } from './shared/shared.module';
import { CustomerModule } from './modules/customer/customer.module';
import { ManagerModule } from './modules/manager/manager.module';
@NgModule({
  declarations: [AppComponent],
  imports: [
    MaterialModule,
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    SearchModule,
    SharedModule,
    CustomerModule,
    ManagerModule,
    RegisterModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
