import { Component, OnInit } from '@angular/core';
import { history } from 'src/app/models/history.models';
import { ModalComponent } from '../../components/modal/modal.component';

import { ActivityUserService } from 'src/app/services/ActivityUser.service';
import { SwalCustomService} from 'src/app/services/swal-custom.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-money',
  templateUrl: './money.component.html',
  styleUrls: ['./money.component.scss']
})
export class MoneyComponent implements OnInit {

  public BalanceForm;

  public Money: number;
  public operator: string;

  public ArrayExist: boolean;

  public selectPage: number = 1;
  public selectLimit: number = 3;
  public history: history[] = [];

  public FromHistory = ['Dinero', 'Descripción', 'Fecha']

  constructor(private modal: NgbModal, 
              private service: ActivityUserService,
              private swal: SwalCustomService) {
              }

  ngOnInit(): void {
    this.getBalance();
    this.FileHistory();
    console.log(this.history);
  }

  open(operator, titulo) {
    this.operator = operator;
    const modalRef = this.modal.open(ModalComponent)      
    modalRef.componentInstance.name = titulo;
    modalRef.componentInstance.page = 'money';
    modalRef.result.then((result)=>{
      if(result != undefined || null){        
        console.log(operator);
        this.BalanceForm = {
          description: result.description,
          money: parseFloat(result['money'])
        }
        console.log(this.BalanceForm);
        this.UpdateBalance()
      }
    });
  }

  // funciones get y post

  UpdateBalance(){
    const formValues = Object.assign({},this.BalanceForm,{operator: this.operator})
    this.service.UpdateBalance( formValues )
      .subscribe(()=>{
        this.swal.SwalConfim('Actualizacion de datos exitosa')
      }),(err)=>{
        this.swal.SwalError(err)
      }
  }

  getBalance(){
    this.service.getBalance()
      .subscribe( (result) => {
        this.Money = result.balance['0'].money
      })
  }
  
  async FileHistory(){
    await this.service.FileHistory(this.selectLimit, this.selectPage)
    .subscribe(  data  => {
      if(data.history['docs'].length === 0){
        this.ArrayExist = false;
      }else{
        this.ArrayExist = true;
      }
      this.history = data.history['docs'];
    })
  }
  


}
