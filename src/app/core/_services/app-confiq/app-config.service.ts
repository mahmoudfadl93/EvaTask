import { Injectable, Injector } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { tap, map } from 'rxjs/operators';
@Injectable()
export class AppConfigService {
  private appConfig:any;

  constructor (private injector: Injector) { }

  loadAppConfig() {
      let http = this.injector.get(HttpClient);
      return http.get('/assets/config.json')
      .toPromise()
      .then(data => {
          this.appConfig = data;
      })
  }

  get config() {
      if(this.appConfig == undefined){
          this.loadAppConfig();
      }
      return this.appConfig;
  }



}
