import { Component, OnInit } from '@angular/core';
import { ActivityBusinessService } from 'src/app/services/ActivityBusiness.service';
import { SwalCustomService } from 'src/app/services/swal-custom.service';
import { Sale } from '../../models/sale.models'

@Component({
  selector: 'app-business-sale',
  templateUrl: './business-sale.component.html',
  styleUrls: ['./business-sale.component.scss']
})
export class BusinessSaleComponent implements OnInit {

  public getStorage = JSON.parse(localStorage.getItem('business'))
  public TitleArray = ['Producto', 'Precio', 'Unidades', ''];
  public TitleArrayTrolley = ['Producto', 'Cantidad', 'Valor Unit.', 'Valor Total', '', ''];
  public Array = [];
  public Product;
  public Total: number = 0;
  public operator1: number = 0;
  public ArrayExist: boolean;


  constructor(private ActivityService: ActivityBusinessService, private Swal: SwalCustomService) { }

  ngOnInit(): void {
    this.getInventoyAll()   
  }


  product(event){
    this.Product = event;   
  }
  
  quantity(event){
    this.operator1 = event['quantity']
    if(this.Array.length === 0){
      const operator = this.Product['money'] * event['quantity'];
      const fixed = operator.toFixed(2);
      const total = Number(fixed);
    this.Array.push({
      name: this.Product['name'],
      quantity: event['quantity'],
      money: this.Product['money'],
      totalValue: total,
      id: this.Product['_id']
    })
    }else{
      for (let index = 0; index < this.Array.length; index++) {
        if(this.Array[index].name === this.Product.name){
          this.operator1 += this.Array[index].quantity;
          this.Array.splice(index, 1)
        }
      }
      const operator = this.Product['money'] * this.operator1;
      const fixed = operator.toFixed(2);
      const total = Number(fixed);
      this.Array.push({
        name: this.Product['name'],
        quantity: this.operator1,
        money: this.Product['money'],
        totalValue: total,
        id: this.Product['_id']
      })
    }
    this.TotalValue();
  }
  
  Delete(event){   
    for (let index = 0; index < this.Array.length; index++) {
      if(this.Array[index] == event){
        this.Array.splice(index, 1)
      }
    }
    this.TotalValue();
  }

  Edit(event){
    for (let index = 0; index < this.Array.length; index++) {
      if(this.Array[index] == event.data){
        this.Array[index].quantity = event.result.quantity;
        const operator = event.data.money * event.result.quantity;
        const fixed = operator.toFixed(2);
        const total = Number(fixed);
        this.Array[index].totalValue = total
      }
    }
    this.TotalValue();
  }
  
  TotalValue(){
    this.Total = 0;
    for (let index = 0; index < this.Array.length; index++) {
          this.Total += this.Array[index].totalValue;
    }
  }

  clean(){
    this.Array = [];
    this.Total = 0;
  }
  
  guardar(){
    const description = [];
    description.push([ this.Array ]);
    this.Swal.Array = this.Array;
    this.Swal.Total = this.Total;
    console.log(description[0]);
    this.ActivityService.Sale(this.getStorage['_id'], description[0]).subscribe(() => {
      this.Swal.SwalPrint('Crompra exitosa')
    },() => {
      this.Swal.SwalErrorMsg('No hay inventario suficiente')
    })
  }

  getInventoyAll(){
    this.ActivityService.getInventoyAll(this.getStorage['_id'])
    .subscribe( Inventory => {
      if(Inventory['InventoryDB'].length === 0 ){
        this.ArrayExist = false;
      }else{
        this.ArrayExist = true;
      }
    })
  }
  

}
