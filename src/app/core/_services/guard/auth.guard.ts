import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TokenService } from '../token/token.service';



@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private _TokenService: TokenService,
    private router: Router) {

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    return this.checkIfAuthenticated();
  }
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    return this.checkIfAuthenticated();
  }

  private checkIfAuthenticated() {
    return this._TokenService.isLoggedIn$
      .pipe(
        map(loggedIn =>
          loggedIn ? true : this.router.parseUrl('/auth'))
      );
  }
}
