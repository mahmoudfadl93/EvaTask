import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfigService } from '@core/_services/app-confiq/app-config.service';
import { BaseService } from '@core/_services/base/base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CityService extends BaseService {

  constructor(private http: HttpClient,
    private env: AppConfigService) {
    super(env);
  }

  GetAllCity(): Observable<any> {
    return this.http.get<any>(this.baseUrl + `city`)
  }

  GetAllCityOfCountry(id: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + `city/getcities/` + id)
  }

  GetCityById(id:any): Observable<any> {
    return this.http.get<any>(this.baseUrl + `city/` + id)
  }

  AddCity(body: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + `city`, body)
  }
  EditCity(body: any): Observable<any> {
    return this.http.put<any>(this.baseUrl + `city`, body)
  }
  DeleteCityById(id:any): Observable<any> {
    return this.http.delete<any>(this.baseUrl + `city/` + id)
  }


}
