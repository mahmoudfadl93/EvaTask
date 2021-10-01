import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfigService } from '@core/_services/app-confiq/app-config.service';
import { BaseService } from '@core/_services/base/base.service';
import { TokenService } from '@core/_services/token/token.service';
import { Observable } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';
import { AuthLogin } from './auth.model';

@Injectable()
export class AuthService extends BaseService {

  constructor(
    private _TokenService: TokenService,
    private http: HttpClient,
    private env: AppConfigService) {
    super(env);
  }

  login(body:AuthLogin): Observable<any> {
    return this.http.post<any>(this.baseUrl + `user/login`, body)
      .pipe(
        tap(token => {
          this._TokenService.subject.next(token.token);
          localStorage.setItem('token', token.token);
        }),
        shareReplay()
      );
  }

  logout() {
    this._TokenService.subject.next(null);
    localStorage.removeItem('token');
  }
}
