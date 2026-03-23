import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(): boolean {
    
    const token = localStorage.getItem('token');

    if (!token) {
      this.router.navigate(['/login']);

      return false;
    }

    const payload = JSON.parse(atob(token.split('.')[1]));
    const role = payload['role']; 

    if (role === 'Admin')
    {
      return true;
    }


    else
    {
      this.router.navigate(['/search']);

      return false;
    }
  }
}


