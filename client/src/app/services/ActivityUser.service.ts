import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { history } from '../models/history.models';
import { balance } from '../models/balance.model';
import { UsuarioService } from './usuario.service';

import { environment } from '../../environments/environment';

const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})

export class ActivityUserService {

  public history: history;
  public balance: balance;


  constructor( private http: HttpClient, private service: UsuarioService) {
   }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid(): string {
    return this.service.uid || '';
  }

  // History -----------------------------------------------

  FileHistory( selectLimit: number = 0, selectPage: number = 0){
    const url = `${ base_url }/history/${ this.uid }?selectLimit=${ selectLimit }&selectPage=${ selectPage }`;
    return this.http.get<{ history: history[] }>( url, {           
      headers:{
        'x-token': this.token
      }
    })
  }

  // Balance -----------------------------------------------

  UpdateBalance( balance: {description: string, money: number, operator: string}){
    const url = `${ base_url }/balance/${ this.uid }`;
    return this.http.post( url, balance,{  
      headers:{
        'x-token': this.token
      },
    })
  }

  getBalance(){
    const url = `${ base_url }/balance/${ this.uid }`;
    return this.http.get<{ balance: balance }>( url, {  
      headers:{
        'x-token': this.token
      },
    })
  }

  // Contacts -----------------------------------------------

  getContact(){
    const url = `${base_url}/contact/${this.uid}`
    return this.http.get(url, {
      headers:{
        'x-token': this.token
      },
    })
  }

  postContact(contact: {name: string, mobile: number, phone: number, email: string}){
    const url = `${base_url}/contact/${this.uid}`
    return this.http.post(url, contact, {
      headers:{
        'x-token': this.token
      },
    })
  }

  putContact(id, contact: {name: string, mobile: number, phone: number, email: string}){
    const url = `${base_url}/contact/${id}`
    return this.http.put(url, contact, {
      headers:{
        'x-token': this.token
      },
    })
  }

  deleteContact(id){
    const url = `${base_url}/contact/${id}`
    return this.http.delete(url, {
      headers:{
        'x-token': this.token
      },
    })
  }

  Messange( msg: {name: string, affair: string, email: string, message: string}){
    const url = `${base_url}/messange/`
    return this.http.post(url, msg, {
      headers:{
        'x-token': this.token
      },
    })
  }

}