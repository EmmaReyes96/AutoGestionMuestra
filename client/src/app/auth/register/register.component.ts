import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService  } from '../../services/usuario.service'
//SweerAlert2
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { SwalCustomService } from 'src/app/services/swal-custom.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public formSubmitted = false;

  private emailPattern: any = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;

  public registerForms = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.minLength(5), Validators.pattern(this.emailPattern)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required, Validators.minLength(6)]]
  },{
    validators: this.PasswordIguales('password', 'password2')
  })

  constructor(private fb: FormBuilder, 
              private UsuarioService: UsuarioService,
              private router: Router,
              private Swal: SwalCustomService ) { }
    
  ngOnInit(): void {
  }
  
  crearUsuario(){
    this.formSubmitted = true;
    this.UsuarioService.CrearUsuario( this.registerForms.value )
      .subscribe( resp => {
        console.log('usuario creado')
        console.log(resp);
        this.router.navigateByUrl('/')
      }, (err) => {
        this.Swal.SwalError(err)
      });

  }

  campoNoValido (campo: string): boolean {
    if (this.registerForms.get(campo).invalid && this.formSubmitted){
      return true
    }else{
      return false
    }
  }

  PasswordNoValidas(){
    const pass1 = this.registerForms.get('password').valid;
    const pass2 = this.registerForms.get('password2').valid;

    if ( (pass1 !== pass2) && this.formSubmitted ){
      return true;
    }else{
      return false;
    }

  }

  PasswordIguales( pass1Name: string, pass2Name: string){
    return ( formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if( pass1Control.value === pass2Control.value){
        pass2Control.setErrors(null);
      }else{
        pass2Control.setErrors({ noEsIgual: true})
      }
    }
  }

}
