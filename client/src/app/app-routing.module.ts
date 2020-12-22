import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { authRoutingModule } from './auth/auth.routing';
import { PagesRoutingModule } from './pages/pages.routing';



const routes: Routes = [
  {path: '', redirectTo: '/Home', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    authRoutingModule,
    PagesRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
