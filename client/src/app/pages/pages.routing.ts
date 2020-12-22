import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../guards/auth.guard'

import { PagesComponent } from './pages.component';
import { WhitepageComponent } from './whitepage/whitepage.component';

import { BusinessPageComponent } from './business-page/business-page.component';
import { UserPageComponent } from './user-page/user-page.component';

import { ActivityComponent } from './activity/activity.component';
import { HelpComponent } from './help/help.component';
import { UserComponent } from './user/user.component';
import { MoneyComponent } from './money/money.component';
import { ContactComponent } from './contact/contact.component';

import { BusinessBalanceComponent } from './business-balance/business-balance.component';
import { BusinessInventoryComponent } from './business-inventory/business-inventory.component';
import { BusinessSaleComponent } from './business-sale/business-sale.component';
import { BusinessSpendingComponent } from './business-spending/business-spending.component';
import { BusinessComponent  } from './business/business.component';
import { BusinessSaleFilesComponent  } from './business-sale-files/business-sale-files.component';
import { BusinessSpendingFilesComponent  } from './business-spending-files/business-spending-files.component';
import { BusinessContactsComponent  } from './business-contacts/business-contacts.component';





const routes: Routes = [ 
    {path: 'Home', 
    component: PagesComponent,  
    canActivate: [ AuthGuard ],
    children: [
        {path: '', component: WhitepageComponent, data: { titulo: 'Home'}},
        {path: 'User', component: UserComponent, data: { titulo: 'User'}},
        {path: 'Help', component: HelpComponent, data: { titulo: 'help'}},
        {path: 'Business', component: BusinessComponent, data: { titulo: 'Business'},},        
        {path: 'BusinessPage', 
        component: BusinessPageComponent, 
        data: { titulo: 'BusinessPage'},
        children: [
            {path: 'Balance', component: BusinessBalanceComponent, data: { titulo: 'Balance'} },
            {path: 'Sale', component: BusinessSaleComponent, data: { titulo: 'Sale'} },
            {path: 'Spending', component: BusinessSpendingComponent, data: { titulo: 'Spending'} },
            {path: 'Inventory', component: BusinessInventoryComponent, data: { titulo: 'Inventory'} },
            {path: 'SaleFiles', component: BusinessSaleFilesComponent, data: { titulo: 'SaleFiles'} },
            {path: 'SpendingFiles', component: BusinessSpendingFilesComponent, data: { titulo: 'SpendingFiles'} },
            {path: 'Contact', component: BusinessContactsComponent, data: { titulo: 'Contact'} },
        ]},
        {path: 'UserPage', 
        component: UserPageComponent, 
        data: { titulo: 'UserPage'},
        children: [
            {path: 'Activity', component: ActivityComponent, data: { titulo: 'Activity'}},
            {path: 'Money', component: MoneyComponent, data: { titulo: 'Money'}},            
            {path: 'Contact', component: ContactComponent, data: { titulo: 'Contact'}},            
        ]},
  ]},
    
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}