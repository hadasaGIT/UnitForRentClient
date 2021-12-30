import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MaterialModule } from 'src/app/material.module';
import { RegisterComponent } from './register-component/register.component';
import { RegisterService } from './services/register.service';

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [RegisterService],
  exports: [RegisterComponent],
})
export class RegisterModule {}
