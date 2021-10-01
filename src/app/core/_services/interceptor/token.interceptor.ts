import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../token/token.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private _TokenService: TokenService) {

  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this._TokenService.getToken()) {
      request = request.clone({
        setHeaders: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${this._TokenService.getToken()}`,
        },
      });
    }

    return next.handle(request);
  }
}
