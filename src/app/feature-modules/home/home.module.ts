import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { DailoqComponent } from './components/dailoq/dailoq.component';
import { CountriesComponent } from './pages/countries/countries.component';
import { CountryComponent } from './pages/country/country.component';
import { CityComponent } from './pages/city/city.component';
import { CitiesComponent } from './pages/cities/cities.component';
import { SharedModule } from '@shared/shared.module';
import { CountryService } from './services/country.service';


@NgModule({
  declarations: [
    DailoqComponent,
    CountriesComponent,
    CountryComponent,
    CityComponent,
    CitiesComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ],
  providers:[
    CountryService
  ]
})
export class HomeModule { }
