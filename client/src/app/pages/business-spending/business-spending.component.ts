import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivityBusinessService } from 'src/app/services/ActivityBusiness.service';
import { SwalCustomService } from 'src/app/services/swal-custom.service';
import { ModalComponent } from '../../components/modal/modal.component'

@Component({
  selector: 'app-business-spending',
  templateUrl: './business-spending.component.html',
  styleUrls: ['./business-spending.component.scss']
})
export class BusinessSpendingComponent implements OnInit {

  public getStorage = JSON.parse(localStorage.getItem('business'));
  public TitleArray = ['Producto', ''];
  public TitleArrayTrolley = ['Producto', 'Cantidad', 'Valor de Compra','Valor Total',''];

  public ArrayInventory = [];

  public ArrayTrolley = [];
  public ArrayProducts = [];

  public Product;
  public Total: number = 0;
  public operator1: number = 0;

  constructor(private ActivityService: ActivityBusinessService, private Swal: SwalCustomService, private modal: NgbModal) { }

  ngOnInit(): void {
    this.ProductExist();
  };

  clean(){
    this.ArrayTrolley = [];
    this.Total = 0;
  };
  
  product(event){
    this.Product = event;
    console.log(this.Product);        
  };

  TotalValue(){
    this.Total = 0;
    for (let index = 0; index < this.ArrayTrolley.length; index++) {
          this.Total += this.ArrayTrolley[index].totalValue;
    };
  };
  
  Delete(event){   
    for (let index = 0; index < this.ArrayTrolley.length; index++) {
      if(this.ArrayTrolley[index] == event){
        this.ArrayTrolley.splice(index, 1)
      }
    };
    this.TotalValue();
  };
  
  quantity(event){
    console.log(event);
    this.operator1 = event['quantity']
    const operator = event['money'] * event['quantity'];
    const fixed = operator.toFixed(2);
    const total = Number(fixed);
    this.ArrayTrolley.push({
      name: this.Product['name'],
      quantity: parseInt(event['quantity']),
      money: parseInt(event['money']),
      totalValue: total
    });
    this.ArrayProducts.push({
      name: this.Product['name'],
      quantity: parseInt(event['quantity']),
      money: parseInt(this.Product['money'])
    });
    this.TotalValue();
  };

  newProduct(){
    const modalRef = this.modal.open(ModalComponent)
    modalRef.componentInstance.page = 'SpendingTrolley';
    modalRef.componentInstance.name = 'Nuevo Producto';
    modalRef.result.then((result)=>{
      const name = result.name.toLowerCase();
      const Value = Number(result.spending);    
      const fixed = Value.toFixed(2);
      const total = Number(fixed);
      if(result != undefined || null){          
          if( this.ArrayInventory.includes(name)){
            this.Swal.SwalErrorMsg('El producto ya existe.');
          }else{
            const operator = total * result.quantity;
            const fixed = operator.toFixed(2);
            const totalValue = Number(fixed);          
              this.ArrayTrolley.push({
                name: name,
                quantity: parseInt(result.quantity),
                money: total,
                totalValue: totalValue
              });
              this.ArrayProducts.push({
                name: name,
                quantity: parseInt(result.quantity),
                money: parseFloat(result.money)
              });
            this.TotalValue();
          }
      }
    }); 
  }

  ProductExist(){
    this.ActivityService.getInventoyAll(this.getStorage['_id']).subscribe( data => { 
      for (let index = 0; index < data['InventoryDB'].length; index++) {
        this.ArrayInventory.push(data['InventoryDB'][index].name);       
      }
    });
  }
  
  other(){
    const modalRef = this.modal.open(ModalComponent)      
    modalRef.componentInstance.page = 'SpendingTrolleyOther';
    modalRef.componentInstance.name = 'Declarar otro tipo de gasto';
    modalRef.result.then((result)=>{
      if(result != undefined || null){
        this.ArrayTrolley.push({
          name: result.description,
          quantity: 0,
          money: parseFloat(result.money),
          totalValue: parseFloat(result.money)
        });
      }
      this.TotalValue();  
    });   
  }


  guardar(){
    const description = [];
    description.push([ this.ArrayTrolley, this.ArrayProducts ]);
    this.Swal.Array = this.ArrayTrolley;
    this.Swal.Total = this.Total;
    console.log(description[0]);
    this.ActivityService.Spending(this.getStorage['_id'], description[0]).subscribe(() => {
      this.Swal.SwalPrint('Gestion de gastos exitoso')
    },(err) => {
      this.Swal.SwalError(err)
    });
  };

};
