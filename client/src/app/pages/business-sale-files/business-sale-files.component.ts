import { Component, OnInit } from '@angular/core';
import { ActivityBusinessService } from 'src/app/services/ActivityBusiness.service';
import { SwalCustomService } from 'src/app/services/swal-custom.service';

@Component({
  selector: 'app-business-sale-files',
  templateUrl: './business-sale-files.component.html',
  styleUrls: ['./business-sale-files.component.scss']
})
export class BusinessSaleFilesComponent implements OnInit {

  public getStorage = JSON.parse(localStorage.getItem('business'));

  public Array = [];

  public ArrayExist: boolean;

  public selectLimit: number = 5;
  public selectPage: number = 1;
  public nextPage: number;
  public prevPage: number;
  public totalDocs: number;
  public totalPage: number;

  constructor(private ActivityService: ActivityBusinessService, private Swal: SwalCustomService) { }

  ngOnInit(): void {
    this.getSale();
  }

  getSale(){
    this.ActivityService.getSale(this.getStorage['_id'], this.selectLimit, this.selectPage)
    .subscribe((data)=>{
      if(data['SaleDB'].totalDocs === 0){
        this.ArrayExist = false;
      }else{
        this.ArrayExist = true;
      }
      this.Array = data['SaleDB'].docs
      this.totalPage = data['SaleDB'].totalPages;
      this.nextPage = data['SaleDB'].nextPage; 
      this.prevPage = data['SaleDB'].prevPage; 
      this.totalDocs = data['SaleDB'].totalDocs;
    });
  };


  print(i){
    this.Swal.Title = 'Venta';
    this.Swal.Total = this.Array[i].money;
    this.Swal.Array = this.Array[i].description;
    this.Swal.Print();
  };

  changePages(valor: number){
    this.selectPage += valor;
    if(this.selectPage < 1){
      this.selectPage = 1;
    };
    if(this.selectPage >= this.totalPage){
      this.selectPage = this.totalPage
    }
    this.getSale();
  }
}
