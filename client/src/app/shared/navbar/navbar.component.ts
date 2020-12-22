import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public imgUrl: string;
  public name: string;

  constructor(private service: UsuarioService, private router: Router) {
    this.imgUrl = service.User.imgUrl
    this.name = service.User.name
   }

  ngOnInit(): void {
  }

  exit(){
    this.service.exit();
  }

}
