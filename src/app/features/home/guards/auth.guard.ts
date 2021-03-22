import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthorizationService } from '../services/authorization.service';

@Injectable()
export class AuthGuard implements CanActivate {
  isLoggedIn: boolean = false;

  constructor (
    private authService: AuthorizationService
  ) {
    this.getUserLoggedStatus();
  }

  getUserLoggedStatus(): void {
    this.authService.isLogged().subscribe((user: any) => {
      if (user && user.uid) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isLoggedIn;
  }
}
