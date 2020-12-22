import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivityBusinessService } from 'src/app/services/ActivityBusiness.service';
import { ActivityUserService } from 'src/app/services/ActivityUser.service';
import { SwalCustomService } from 'src/app/services/swal-custom.service';
import { ModalComponent } from '../../components/modal/modal.component'

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  public getStorage = JSON.parse(localStorage.getItem('business'))

  @Input() TitleArray;
  @Input() Array;
  @Input() Component;
  
  @Input() TotalValue: number;

  @Output() delete: EventEmitter<any> = new EventEmitter();
  @Output() edit: EventEmitter<any> = new EventEmitter();

  @Output() product: EventEmitter<any> = new EventEmitter();
  @Output() quantity: EventEmitter<any> = new EventEmitter();
  
  public filterArray = '';
  public Inventory;
  
  constructor(private modal: NgbModal, 
              private ActivityService: ActivityBusinessService, 
              private ActivityUserService: ActivityUserService,
              private Swal: SwalCustomService) { }
  
  
  ngOnInit(): void {
    if(this.Component == 'Sale' || this.Component == 'Spending'){
      this.getInventoyAll();
    }    
    if(this.Component == 'Contact'){
      this.getContactAll();
    }    
    if(this.Component == 'BusiContact'){
      this.getBusiContactAll();
    }    
  }
  
  Edit(data){
    this.edit.emit(data);
  }

  Delete(data){
    this.delete.emit(data);
  }

  EditTrolley(data){
    this.product.emit(data);
    const modalRef = this.modal.open(ModalComponent)      
    modalRef.componentInstance.page = 'Sale';
    modalRef.componentInstance.name = 'Cantidad';
    modalRef.result.then((result)=>{
      this.ActivityService.getInventoyAll(this.getStorage['_id'])
      .subscribe( Inventory => {
        for (let index = 0; index < Inventory['InventoryDB'].length; index++) {
          if(Inventory['InventoryDB'][index].name == data.name){
            this.Inventory = Inventory['InventoryDB'][index].quantity
          }
        }
        if(result.quantity > this.Inventory){
          this.Swal.SwalErrorMsg('No posee tantas unidades');
        }else{
          this.edit.emit({result, data});
        }
      })
    });   
  }

  cartPlus(data){
    if(data.quantity === 0){
      this.Swal.SwalErrorMsg('No hay unidades disponibles');
    }else{
      this.product.emit(data);
      const modalRef = this.modal.open(ModalComponent)      
      modalRef.componentInstance.page = 'Sale';
      modalRef.componentInstance.name = 'Cantidad';
      modalRef.result.then((result)=>{
        if(result != undefined || null){
          if(result.quantity > data.quantity){
            this.Swal.SwalErrorMsg('No posee tantas unidades');
          }else{
            this.quantity.emit(result);
          }
        }
      });
    }
  }

  cartPlus2(data){
    this.product.emit(data);
    const modalRef = this.modal.open(ModalComponent)      
    modalRef.componentInstance.page = 'Spending';
    modalRef.componentInstance.name = 'Cantidad y Valor de Compra';
    modalRef.result.then((result)=>{
      if(result != undefined || null){
        this.quantity.emit(result);
      }
    });   
  }

  getInventoyAll(){
    this.ActivityService.getInventoyAll(this.getStorage['_id'])
    .subscribe( Inventory => {
      this.Array = (Inventory['InventoryDB']);
    })
  }

  getContactAll(){
    this.ActivityUserService.getContact()
    .subscribe( contact => {
      this.Array = (contact['contactDB']);
    })
  }

  getBusiContactAll(){
    this.ActivityService.getContact(this.getStorage['_id'])
    .subscribe( contact => {
      this.Array = (contact['contactDB']);
    })
  }



}
