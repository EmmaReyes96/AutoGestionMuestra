import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.models';
import { SwalCustomService } from 'src/app/services/swal-custom.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public userForm: FormGroup;
  public user: Usuario;
  public imgCh: File;
  public imgTemp: any = null;

  constructor(private form: FormBuilder, 
              private Swal: SwalCustomService,
              private UploadService: UploadService,
              private service: UsuarioService,) {
    this.user = service.User;
  }

  ngOnInit(): void {
    this.userForm = this.form.group({
      name: [ this.user.name , Validators.required],
      email: [ this.user.email , [Validators.required, Validators.email]]
    })
    this.user.imgUrl
  }
  
  UpdateUser(){
    this.service.UpdateUser( this.userForm.value )
      .subscribe( () => {
         const { name, email } = this.userForm.value;
        this.user.name = name;
        this.user.email = email;  
        this.Swal.SwalConfim('Actualizacion de datos exitosa');
      }),(err) => (
        this.Swal.SwalError(err)
      );
  }

  changeImg( file: File){
    this.imgCh = file;

    if(!file){
      return this.imgTemp = null;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }
  }

  UploadImg(){
    this.UploadService.fileUpload(this.imgCh, 'user', this.user.uid)
    .then(img => {
      this.user.img = img;
      this.Swal.SwalConfim('Carga de Imagen exitosa');
    }).catch((err) => (
      this.Swal.SwalError(err)
    ))
  }

}