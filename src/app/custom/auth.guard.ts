import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { catchError, map, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {

  const token = localStorage.getItem('t') || '';
  const router = inject(Router);
  const authService = inject(AuthService);

  if(route.url[0].path != "login"){
    if (token != '') {
      return authService.validToken().pipe(
        map((data) => {
          //debugger;
          if (data.success) return true;
          
          localStorage.removeItem("t");
          router.navigate(['/login']);
          return false;
        }),
        catchError((error) => {
          localStorage.removeItem("t");
          router.navigate(['/login']);
          return of(false);
        })
      )
    } else {
      //router.navigateByUrl("/login");
      const url = router.createUrlTree(['']);
      return url;
    }
  }else{
    //debugger;
    if (token != '') {
      return authService.validToken().pipe(
        map((data) => {
          if (data.success) router.navigate(['/start']);
          else localStorage.removeItem("t");
          return true;
        }),
        catchError((error) => {
          localStorage.removeItem("t");
          return of(true);
        })
      )
    }
    return true;
  }
};
