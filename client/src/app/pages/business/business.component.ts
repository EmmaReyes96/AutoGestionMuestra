import { Component, OnInit } from '@angular/core';
import { ModalComponent } from '../../components/modal/modal.component'
import { BusinessService  } from '../../services/business.service'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SwalCustomService } from 'src/app/services/swal-custom.service';
import { business } from 'src/app/models/business.models';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url


@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.scss']
})
export class BusinessComponent implements OnInit {

  public BusinessModel: business;
  public BusinessForm;
  public BusinessArray = [];
  public IdBusiness: string;

  constructor(private modal: NgbModal,
              private BusiService: BusinessService,
              private Swal: SwalCustomService) { }

  ngOnInit(): void {    
    this.getBusiness();
  }
  
  async getBusiness(){
    await this.BusiService.getBusiness().subscribe( data => {
      data['BusinessDB'].map(data2 => {
        this.BusinessArray.push(data2)
      })
      for (let index = 0; index < this.BusinessArray.length; index++) {
        this.BusinessModel = this.BusinessArray[index]
        if(this.BusinessModel.img){
          this.BusinessModel.img = `${ base_url }/uploads/business/${ this.BusinessModel.img }`; 
        }else{
          this.BusinessModel.img = `${ base_url }/uploads/business/not-avalible.png`;
        }
      }
    })
    
  }

  open(){
      const modalRef = this.modal.open(ModalComponent)      
      modalRef.componentInstance.page = 'business';
      modalRef.componentInstance.name = 'Añadir Negocio';
      modalRef.result.then((result)=>{
        if(result != undefined || null){
          this.BusinessForm = result
          console.log(result);
          this.newBusiness();
        }
      });    
  }
  
  newBusiness(){
    this.BusiService.newBusiness(this.BusinessForm)
      .subscribe( () => {
        this.Swal.SwalConfim('Negocio creado exitosamente')
      }),(err)=>{
        this.Swal.SwalError(err)
      }
  }

  openEdit(i){
    this.IdBusiness = this.BusinessArray[i]._id;
    const modalRef = this.modal.open(ModalComponent)      
      modalRef.componentInstance.page = 'update';
      modalRef.componentInstance.name = 'Actualizar Negocio';
      modalRef.componentInstance.imgUrl = this.BusinessArray[i].img;
      modalRef.componentInstance.EditName = this.BusinessArray[i].name;
      modalRef.componentInstance.EditCity = this.BusinessArray[i].city;
      modalRef.componentInstance.EditAddress = this.BusinessArray[i].address;
      modalRef.componentInstance.EditDescription = this.BusinessArray[i].description;
      modalRef.componentInstance.IdBusiness = this.BusinessArray[i]._id;
      modalRef.result.then((result)=>{
        if(result != undefined || null){
          this.BusinessForm = result
          console.log(result);
          this.updateBusiness();
        }
      }); 
  }

  updateBusiness(){
    this.BusiService.updateBusiness(this.IdBusiness, this.BusinessForm )
      .subscribe(()=>{ 
        this.Swal.SwalConfim('Negocio actualizado exitosamente')
      }),(err)=>{
        this.Swal.SwalError(err)
      }
  }

  SelecBusiness(i){
    this.BusiService.SaveStorage(this.BusinessArray[i])
  }
}
