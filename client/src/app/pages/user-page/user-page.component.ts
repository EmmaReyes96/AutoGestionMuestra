import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  UserSidebar = [
    { link:"/Home/UserPage/Money",
      name: "Tu Dinero",
      class: "fas fa-coins"
    },
    { link:"/Home/UserPage/Activity",
      name: "Actividad",
      class: "fas fa-file-invoice-dollar"
    },
    { link:"/Home/UserPage/Contact",
      name: "Contactos",
      class: "far fa-address-book"
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
