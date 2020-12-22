import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators'
import { LoginForm } from '../interfaces/login-form.iterface'; 
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';
import { RegisterForm } from '../interfaces/register-form.iterface'; 
import { Usuario } from '../models/usuario.models'

declare const gapi:any;

const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;
  public User: Usuario;


  constructor( private http: HttpClient, 
                private router: Router,
                private ngZone: NgZone) {
                  this.googleInit()
   }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid(): string {
    return this.User.uid || '';
  }

  googleInit(){
    return new Promise( (resolve, reject) => {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '954698292497-3gc1foa7pnh4da3qds9jn0bpgmt2phnb.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        resolve();
      });
    })
  }

  exit(){
    localStorage.removeItem('token');    
    this.auth2.signOut().then( () => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      })
    });
  }

  TokenValidate(): Observable<boolean>{    
    return this.http.get(`${ base_url }/login/renew` , {
      headers:{
        'x-token': this.token
      }
    }).pipe( 
      tap((resp: any) => {
        const { name, email, google, img, uid } = resp.user
        this.User = new Usuario( name, email, google, img, uid );
        localStorage.setItem('token', resp.token );
    }),
      map( resp => true ),
      catchError( error => of(false))
    );
  }

  CrearUsuario( formData: RegisterForm ){
   return  this.http.post(`${ base_url }/register` , formData)
                    .pipe( 
                      tap((resp: any) => {
                      localStorage.setItem( 'token', resp.token )
                      })
                    )
  }

  login( formData: LoginForm ){
   return  this.http.post(`${ base_url }/login` , formData)
                    .pipe( 
                      tap((resp: any) => {
                      localStorage.setItem( 'token', resp.token )
                      })
                    )
  }

  loginGoogle( token: LoginForm ){
    return  this.http.post(`${ base_url }/login/google` , { token })
                     .pipe( 
                       tap((resp: any) => {
                       localStorage.setItem( 'token', resp.token )
                       })
                     )
   }

  UpdateUser( data: {name: string, email: string}){
  return this.http.put(`${ base_url }/edit/${ this.uid }`, data, {           
    headers:{
      'x-token': this.token
    }
  });          
  }

}