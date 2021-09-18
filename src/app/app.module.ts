import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './shared/login/login/login.component';
import { LoginService } from './shared/login/login/services/login.service';
import { LoginModule } from './shared/login/login.module';
import { SearchComponent } from './shared/search/search.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [AppComponent, SearchComponent],
  imports: [
    MaterialModule,
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
