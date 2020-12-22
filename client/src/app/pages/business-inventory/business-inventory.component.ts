import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Inventory } from 'src/app/models/Inventory.models';
import { ActivityBusinessService } from 'src/app/services/ActivityBusiness.service';
import { SwalCustomService } from 'src/app/services/swal-custom.service';

@Component({
  selector: 'app-business-inventory',
  templateUrl: './business-inventory.component.html',
  styleUrls: ['./business-inventory.component.scss']
})
export class BusinessInventoryComponent implements OnInit {

  public getStorage = JSON.parse(localStorage.getItem('business'));
  public Page: number;
  public Array = [];

  public ArrayExist: boolean;

  public selectLimit: number = 4;
  public selectPage: number = 1;
  public nextPage: number;
  public prevPage: number;
  public totalDocs: number;
  public totalPage: number;

  public Inventory: Inventory[] = [];
  public ProductForm: FormGroup;

  public FromInventory = ['Producto', 'Valor', 'Ingreso', 'Edit', 'Bor'];
  
  constructor(private ActivityService: ActivityBusinessService, 
              private form: FormBuilder,
              private Swal: SwalCustomService) { }

  ngOnInit(): void {
    this.clean();
    this.getInventoy();
  }

  getInventoy(){
    this.ActivityService.getInventoy(this.getStorage['_id'], this.selectLimit, this.selectPage)
    .subscribe( Inventory => {
      if(Inventory['InventoryDB'].totalDocs === 0){
        this.ArrayExist = false;
      }else{
        this.ArrayExist = true;
      }
      this.Inventory = Inventory['InventoryDB'].docs;
      this.totalPage = Inventory['InventoryDB'].totalPages;
      this.nextPage = Inventory['InventoryDB'].nextPage; 
      this.prevPage = Inventory['InventoryDB'].prevPage; 
      this.totalDocs = Inventory['InventoryDB'].totalDocs; 
    })
  }

  changePages(valor: number){
    this.selectPage += valor;
    if(this.selectPage < 1){
      this.selectPage = 1;
    };
    if(this.selectPage >= this.totalPage){
      this.selectPage = this.totalPage
    }
    this.getInventoy();
  }

  newProduct(){
    const ArrayPush = [];
    this.Array.push(this.ProductForm.value);
    ArrayPush.push(this.Array)
    this.ActivityService.newProducts(this.getStorage['_id'], ArrayPush[0])
      .subscribe(()=>{
        this.Swal.SwalConfim('Carga exitosa')
        console.log(this.ProductForm.value);
      },(err)=>{
        this.Swal.SwalError(err)
      })
  }

  clean(){
    this.ProductForm = this.form.group({
      name: ['', Validators.required],
      money: ['', Validators.required],
      quantity: ['', Validators.required],
    })
  }

  Edit(event){
    this.ProductForm = this.form.group({
      name: [event.name, Validators.required],
      money: [event.money, Validators.required],
      quantity: [event.quantity, Validators.required],
    })
  }

  Delete(event){
    this.ActivityService.DeleteProducts(event['_id'])
      .subscribe(()=>{
        this.Swal.SwalConfim('Eliminación exitosa')
      })
  }

}
