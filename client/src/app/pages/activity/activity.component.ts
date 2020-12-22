import { Component, OnInit } from '@angular/core';
import { history } from 'src/app/models/history.models';
import { ActivityUserService } from 'src/app/services/ActivityUser.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {
  
  public Page: number;
  public totalDocs: number;

  public selectPage: number = 1;
  public selectLimit: number = 5;
  public nextPage: number;
  public prevPage: number;
  public history: history[] = [];
  public totalPage: number;

  public ArrayExist: boolean;

  public FromHistory = ['Dinero', 'Descripción', 'Fecha']

  constructor(private service: ActivityUserService ) { 
  }

  ngOnInit(): void {
    this.FileHistory();
    
  }

  FileHistory(){
    this.service.FileHistory(this.selectLimit, this.selectPage)
    .subscribe(  data  => {
      if(data.history['docs'].length === 0){
        this.ArrayExist = false;
      }else{
        this.ArrayExist =  true;
      }
      this.history = data.history['docs'];
      this.totalPage = data.history['totalPages'];
      this.nextPage = data.history['nextPage']; 
      this.prevPage = data.history['prevPage']; 
      this.totalDocs = data.history['totalDocs']; 
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
    this.FileHistory();
  }

 
}
