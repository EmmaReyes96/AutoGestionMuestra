import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from './usuario.service';
import { business } from '../models/business.models';

import { environment } from 'src/environments/environment';

const base_url = environment.base_url



@Injectable({
  providedIn: 'root'
})
export class BusinessService {
  
  public business = business;

  constructor(private http: HttpClient,
    private service: UsuarioService) { }
    
  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid(): string {
    return this.service.uid || '';
  }

  getImg(img){
   const url = `${ base_url }/uploads/business/${img}`
   return this.http.get(url)
  }

  getBusiness(){
    const url = `${base_url}/business/${this.uid}`
    return this.http.get( url, {  
      headers:{
        'x-token': this.token
      },
    })
  }

  SaveStorage(Busi){
    localStorage.setItem('business', JSON.stringify(Busi))
  }

  newBusiness( business: {name: string, city: string, address: string, description: string}){
    const url = `${base_url}/business/${this.uid}`
    return this.http.post(url, business, {
      headers:{
        'x-token': this.token
      },
    })
  }

  updateBusiness( id , business: {name: string, city: string, address: string, description: string}){
    const url = `${base_url}/business/${id}`
    return this.http.put(url, business, {
      headers:{
        'x-token': this.token
      },
    })
  
  }


}
