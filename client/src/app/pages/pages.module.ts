import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';

import { WhitepageComponent } from './whitepage/whitepage.component';
import { PagesComponent } from './pages.component';
import { ActivityComponent } from './activity/activity.component';
import { MoneyComponent } from './money/money.component';
import { HelpComponent } from './help/help.component';
import { UserComponent } from './user/user.component';
import { ComponentsModule } from '../components/components.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserPageComponent } from './user-page/user-page.component';
import { BusinessPageComponent } from './business-page/business-page.component';
import { BusinessSaleComponent } from './business-sale/business-sale.component';
import { BusinessSpendingComponent } from './business-spending/business-spending.component';
import { BusinessBalanceComponent } from './business-balance/business-balance.component';
import { BusinessComponent } from './business/business.component';
import { BusinessInventoryComponent } from './business-inventory/business-inventory.component';
import { BusinessSaleFilesComponent } from './business-sale-files/business-sale-files.component';
import { BusinessSpendingFilesComponent } from './business-spending-files/business-spending-files.component';
import { ContactComponent } from './contact/contact.component';
import { BusinessContactsComponent } from './business-contacts/business-contacts.component';


@NgModule({
    declarations: [
      WhitepageComponent,
      PagesComponent,
      ActivityComponent,
      MoneyComponent,
      HelpComponent,
      UserComponent,
      UserPageComponent,
      BusinessPageComponent,
      BusinessSaleComponent,
      BusinessSpendingComponent,
      BusinessBalanceComponent,
      BusinessComponent,
      BusinessInventoryComponent,
      BusinessSaleFilesComponent,
      BusinessSpendingFilesComponent,
      ContactComponent,
      BusinessContactsComponent
    ],  
    exports: [
      WhitepageComponent,
      PagesComponent,      
      ActivityComponent,
      MoneyComponent,
      HelpComponent,
      UserComponent,
      UserPageComponent,
      BusinessPageComponent,
      BusinessSaleComponent,
      BusinessSpendingComponent,
      BusinessBalanceComponent,
      BusinessComponent,
      BusinessInventoryComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        AppRoutingModule,
        NgbModule,
        FormsModule,
        ReactiveFormsModule,
        ComponentsModule
    ],
    bootstrap: [PagesComponent]
  })


export class PagesModule { }