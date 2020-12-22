import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
//SweerAlert2
import Swal from 'sweetalert2'

declare const gapi:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  public auth2: any;

  public loginForms = this.fb.group({
    email: [ localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: [ '', [Validators.required]],
    remember: [ localStorage.getItem('email') ? true : false]
  });

  constructor(private router: Router , 
              private fb: FormBuilder, 
              private UsuarioService: UsuarioService,
              private ngZone: NgZone) { }

  ngOnInit(): void {
    this.renderButton();
  }

  login(){
    this.UsuarioService.login( this.loginForms.value )
      .subscribe(resp => {
        if( this.loginForms.get('remember').value ) {
          localStorage.setItem(('email'), this.loginForms.get('email').value);
        }else{
          localStorage.removeItem('email');
        }

        this.router.navigateByUrl('/')
        
      },(err) => {
        Swal.fire('Error', err.error.msg, 'error')
      });
    // this.router.navigateByUrl('/');
  }



  
  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 50,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
    });
    this.startApp();

  }

  async startApp() {
    await this.UsuarioService.googleInit();
    this.auth2 = this.UsuarioService.auth2;
    this.attachSignin(document.getElementById('my-signin2'));
  }

  attachSignin(element) {
    this.auth2.attachClickHandler( element, {},
        (googleUser) => {
            var id_token = googleUser.getAuthResponse().id_token;
            this.UsuarioService.loginGoogle(id_token)
            .subscribe( resp => {
              this.ngZone.run(() => {
                this.router.navigateByUrl('/')
              });
            });

        }, (error) => {
          alert(JSON.stringify(error, undefined, 2));
        });
  }


}