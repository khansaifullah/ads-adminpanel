import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // if (localStorage.getItem('x-auth')) {
    //   return state.url.startsWith('admin/login')
    //     ? true
    //     : (this.router.navigate(['/']), false);
    // } else {
    //   return state.url.startsWith('admin/login')
    //     ? (this.router.navigate(['/']), false)
    //     : true;
    // }

    if (localStorage.getItem('x-auth-token')) {
      return true;
    }else {
      this.router.navigate(['/login']);
      return false;
    }

    // if (this.userService.isValid()) {
    //   return true;
    // } else {
    //   this.router.navigate(['/login'], {
    //     queryParams: {
    //       return: state.url
    //     }
    //   });
    //   return false;
    // }
  }
}
