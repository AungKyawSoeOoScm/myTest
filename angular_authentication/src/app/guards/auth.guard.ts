import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { Location } from '@angular/common';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private location: Location, private router: Router) { }

  private redirectCount = 0;

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    const startWithAdmin = this.location.path().startsWith('/admin/');
    const startWithUser = this.location.path().startsWith('/user/');
    const loginPath = this.location.path().startsWith('/login');
    const role = localStorage.getItem('role');
    const token = localStorage.getItem('token');
    const wrongURL = this.location.path() && !startWithAdmin && !startWithUser && !loginPath;
    const wrongAdmin = role === 'admin' && !startWithAdmin;
    const wrongUser = role === 'user' && !startWithUser;

    if (token) {
      if (
        (wrongURL &&
          (!this.redirectCount || this.redirectCount < 2)) || (wrongAdmin &&
            (!this.redirectCount || this.redirectCount < 2)) || (wrongUser &&
              (!this.redirectCount || this.redirectCount < 2))
      ) {
        this.redirectCount++;

        this.router.navigate([role === 'admin' ? '/admin/home' : '/user/home']);

        return false;
      }
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
