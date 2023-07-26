// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; 

import { AppComponent } from './app.component';
import { CityListComponent } from './city-list/city-list.component';
import { CityDetailsComponent } from './city-details/city-details.component';

@NgModule({
  declarations: [
    AppComponent,
    CityListComponent,
    CityDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule // Add HttpClientModule here
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

