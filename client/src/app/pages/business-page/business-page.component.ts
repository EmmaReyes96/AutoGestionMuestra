import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BusinessService } from 'src/app/services/business.service';

@Component({
  selector: 'app-business-page',
  templateUrl: './business-page.component.html',
  styleUrls: ['./business-page.component.scss']
})
export class BusinessPageComponent implements OnInit {

  BusinessSidebar = [
    { link:"/Home/BusinessPage/Balance",
      name: "Tu Dinero",
      class: "fas fa-coins"
    },
    { link:"/Home/BusinessPage/Sale",
      name: "Punto.de Venta",
      class: "fas fa-tag"
    },
    { link:"/Home/BusinessPage/SaleFiles",
      name: "Reg.de Ventas",
      class: "fas fa-clipboard-list"
    },
    { link:"/Home/BusinessPage/Spending",
      name: "Gastos",
      class: "fas fa-donate"
    },
    { link:"/Home/BusinessPage/SpendingFiles",
      name: "Reg.de Gastos",
      class: "fas fa-clipboard-list"
    },
    { link:"/Home/BusinessPage/Inventory",
      name: "Inventario",
      class: "fas fa-archive"
    },
    { link:"/Home/BusinessPage/Contact",
      name: "Contactos",
      class: "far fa-address-book"
    }
  ];

  public Business;

  constructor(private BusiService: BusinessService, private router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('business')){
      this.Business = JSON.parse(localStorage.getItem('business'));
    }else{
      this.router.navigateByUrl('/Home/Business')
    }
  }

}
