import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { first, tap } from 'rxjs/operators';
import { TokenService } from '../token/token.service';


@Injectable()
export class CanLoadAuthGuard implements CanLoad {


  constructor(private _TokenService: TokenService, private router: Router) {

  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> {

    return this._TokenService.isLoggedIn$
      .pipe(
        first(),
        tap(loggedIn => {
          if (!loggedIn) {
            this.router.navigateByUrl('/auth');
          }
        })
      );

  }

}
