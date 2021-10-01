import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
   subject = new BehaviorSubject<any>(null);

  user$: Observable<any> = this.subject.asObservable();

  isLoggedIn$ !: Observable<boolean>;
  isLoggedOut$ !: Observable<boolean>;
  constructor() {
    this.isLoggedIn$ = this.user$.pipe(map(user => !!user));

    this.isLoggedOut$ = this.isLoggedIn$.pipe(map(loggedIn => !loggedIn));

    const token = localStorage.getItem('token');

    if (token) {
      this.subject.next(token);
    }
  }

  public getToken(): string {
    let userToken;
    userToken = localStorage.getItem('token');
    if (userToken) {
      return userToken;
    }
    return "";
  }
}
