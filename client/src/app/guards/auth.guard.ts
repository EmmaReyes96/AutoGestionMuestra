import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private sevice: UsuarioService, private router: Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){

    return this.sevice.TokenValidate()
      .pipe(
        tap( authenticated => {
          if(!authenticated){
            this.router.navigateByUrl('/login')
          }
        })
      );
  }
  
}
