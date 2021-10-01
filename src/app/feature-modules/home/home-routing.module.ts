import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CitiesComponent } from './pages/cities/cities.component';
import { CityComponent } from './pages/city/city.component';
import { CountriesComponent } from './pages/countries/countries.component';
import { CountryComponent } from './pages/country/country.component';

const routes: Routes = [
  { path: '', redirectTo: 'country', pathMatch: "full" },
  {
    path: 'country',
    component: CountriesComponent
  },
  {
    path: 'country/details/:id',
    component: CountryComponent
  },
  {
    path: 'city',
    component: CitiesComponent
  },
  {
    path: 'city/details/:id',
    component: CityComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
