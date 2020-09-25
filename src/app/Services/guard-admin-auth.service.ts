import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class GuardAdminAuthService implements CanActivate{

  constructor(
    private auth: AuthService,
    private route: Router
  ) { }

  canActivate(): Observable<boolean>{
    return this.auth.appUser$
      .pipe(map(appUser => {
        if(appUser.isAdmin) return true;
        this.route.navigate(['/']);
        alert("You don't have this permission");
        return false
      }))

  }
}
