import { Component, OnInit } from '@angular/core';
import { ActivityBusinessService } from 'src/app/services/ActivityBusiness.service';
import { SwalCustomService } from 'src/app/services/swal-custom.service';

@Component({
  selector: 'app-business-spending-files',
  templateUrl: './business-spending-files.component.html',
  styleUrls: ['./business-spending-files.component.scss']
})
export class BusinessSpendingFilesComponent implements OnInit {

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
    this.getSpending();
  }

  getSpending(){
    this.ActivityService.getSpending(this.getStorage['_id'], this.selectLimit, this.selectPage)
    .subscribe((data)=>{
      if(data['SpendingDB'].totalDocs === 0){
        this.ArrayExist = false;
      }else{
        this.ArrayExist = true;
      }
      console.log(data['SpendingDB']);
      this.Array = data['SpendingDB'].docs
      this.totalPage = data['SpendingDB'].totalPages;
      this.nextPage = data['SpendingDB'].nextPage; 
      this.prevPage = data['SpendingDB'].prevPage; 
      this.totalDocs = data['SpendingDB'].totalDocs;
    });
  };


  print(i){
    this.Swal.Title = 'Gasto';
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
    this.getSpending();
  }


}
