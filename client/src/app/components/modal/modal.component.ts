import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { business } from 'src/app/models/business.models';
import { UploadService } from 'src/app/services/upload.service';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  
  public BalanceForm: FormGroup;
  public BusinessForm: FormGroup;
  public ProductForm: FormGroup;
  public SaleForm: FormGroup;

  public imgCh: File;
  public imgTemp: any = null;
  public Business: business;

  @Input() name: string;
  @Input() imgUrl: string;
  @Input() page: string;

  @Input() EditName: string;
  @Input() EditCity: string;
  @Input() EditAddress: string;
  @Input() EditDescription: string;
  @Input() IdBusiness: string;
  
  
  constructor(public activeModal: NgbActiveModal, 
              private form: FormBuilder,              
              private UploadService: UploadService) { }

  ngOnInit(): void {
    this.BalanceForm = this.form.group({
      description: ['', Validators.required],
      money: ['', [Validators.required] ]
    });

    this.ProductForm = this.form.group({
      name: ['', Validators.required],
      money: ['', Validators.required],
      quantity: ['', Validators.required],
      spending: ['', Validators.required]
    })    

    if(this.page == 'Sale'){
      this.SaleForm = this.form.group({
        quantity: ['', Validators.required]
      })
    }

    if(this.page == 'Spending'){
      this.SaleForm = this.form.group({
        quantity: ['', Validators.required],
        money: ['', Validators.required],
      })
    }

    if(this.page == 'update'){
      this.BusinessForm = this.form.group({
        name: [this.EditName , Validators.required],
        city: [this.EditCity, Validators.required],
        address: [this.EditAddress, Validators.required],
        description: [this.EditDescription, Validators.required]
      });
    }else{
      this.BusinessForm = this.form.group({
        name: ['', Validators.required],
        city: ['', Validators.required],
        address: ['', Validators.required],
        description: ['', Validators.required]
      });
    }
  };

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
    this.UploadService.fileUpload(this.imgCh, 'business', this.IdBusiness)
  }

}
