import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MaterialModule } from 'src/app/material.module';
import { SearchService } from './services/search.service';
import { SearchComponent } from './search-component/search.component';
import { GoogleMapsModule } from '@angular/google-maps';

@NgModule({
  declarations: [SearchComponent],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    GoogleMapsModule,

    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyB1mREo_v-63dBkLmoH75NXNphqUEo_B1A',
    //   libraries: ['places'],
    // }),
  ],
  providers: [SearchService],
  exports: [SearchComponent],
})
export class SearchModule {}
