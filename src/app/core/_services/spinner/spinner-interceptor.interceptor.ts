import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { SpinnerOverlayServiceService } from '../spinner-overlay/spinner-overlay-service.service';



@Injectable()
export class SpinnerInterceptorInterceptor implements HttpInterceptor {

  constructor(private readonly _SpinnerOverlayServiceService: SpinnerOverlayServiceService) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const spinnerSubscription: Subscription = this._SpinnerOverlayServiceService.spinner$.subscribe();
    return next
      .handle(req)
      .pipe(finalize(() => spinnerSubscription.unsubscribe()));
  }
}
