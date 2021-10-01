import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfigService } from '@core/_services/app-confiq/app-config.service';
import { BaseService } from '@core/_services/base/base.service';
import { Observable } from 'rxjs';

@Injectable()
export class CountryService extends BaseService {

  constructor(private http: HttpClient,
    private env: AppConfigService) {
    super(env);
  }

  GetAllCountry(): Observable<any> {
    return this.http.get<any>(this.baseUrl + `country`)
  }

  GetCountryById(id:any): Observable<any> {
    return this.http.get<any>(this.baseUrl + `country/` + id)
  }

  AddCountry(body: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + `country`, body)
  }

  EditCountry(body: any): Observable<any> {
    return this.http.put<any>(this.baseUrl + `country`, body)
  }
  DeleteCountryById(id:any): Observable<any> {
    return this.http.delete<any>(this.baseUrl + `country/` + id)
  }
}
