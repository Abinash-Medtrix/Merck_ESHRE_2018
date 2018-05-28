import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { CountryService } from './country.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private service: CountryService, private router: Router) { }

  canActivate(route, state: RouterStateSnapshot) {
    // tslint:disable-next-line:curly
    if (this.service.isLoggedIn()) return true;
    this.router.navigate(['/'], { queryParams: {returnUrl: state.url} });
    return false;
  }
}
