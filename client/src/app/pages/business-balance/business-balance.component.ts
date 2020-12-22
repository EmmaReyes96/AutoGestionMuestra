import { Component, Input, OnInit } from '@angular/core';
import { ActivityBusinessService } from 'src/app/services/ActivityBusiness.service';

@Component({
  selector: 'app-business-balance',
  templateUrl: './business-balance.component.html',
  styleUrls: ['./business-balance.component.scss']
})
export class BusinessBalanceComponent implements OnInit {

  public getStorage = JSON.parse(localStorage.getItem('business'));
  public money;

  constructor(private ActivityService: ActivityBusinessService) { }

  ngOnInit(): void {
    this.getBalance();
  }

  getBalance(){
    this.ActivityService.getBalance(this.getStorage['_id']).subscribe(data => {
      this.money = data['BalanceDB'].money
    })
  }

}
