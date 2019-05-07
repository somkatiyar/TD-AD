import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService {

  constructor(private router: Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean {


      if (localStorage.getItem('adminDetail') != null)
 
      return true;
      localStorage.removeItem('adminDetail');
      this.router.navigate(['login']);


      return false;
      
  }
}
