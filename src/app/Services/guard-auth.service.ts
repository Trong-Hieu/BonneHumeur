import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class GuardAuthService implements CanActivate{

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  canActivate(route, state: RouterStateSnapshot){
    return this.auth.user$
      .pipe(map(user => {
        if(user) return true;
        // returnUrl: trả về url đã lưu trc đó, ví dụ admin/order... nếu đã activate
        this.router.navigate(['/'], {queryParams: { returnUrl: state.url }});
        alert("You're not Login")
        console.log("login plz")
        return false;
      }))
  }

}
