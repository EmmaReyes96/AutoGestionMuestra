import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Inventory } from '../models/Inventory.models'

import { environment } from '../../environments/environment';

const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})

export class ActivityBusinessService {

  constructor(private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  // balance ------------------------------------------------

  getBalance(id){
    const url = `${base_url}/business/balance/${id}`
    return this.http.get(url, {
      headers:{
        'x-token': this.token
      },
    })
  }

  // Inventory -----------------------------------------------

  newProducts(id, Products: [{name: string, money: number, quantity: number}]){
    const url = `${base_url}/business/inventory/${id}`
    return this.http.post(url, Products, {
      headers:{
        'x-token': this.token
      },
    })
  }

  getInventoy(id, selectLimit = 0, selectPage = 0){
    const url = `${base_url}/business/inventory/${id}?selectLimit=${ selectLimit }&selectPage=${ selectPage }`
    return this.http.get<{ Inventory: Inventory[] }>(url, {
      headers:{
        'x-token': this.token
      },
    })
  }

  getInventoyAll(id,){
    const url = `${base_url}/business/inventoryAll/${id}`
    return this.http.get<{ Inventory: Inventory[] }>(url, {
      headers:{
        'x-token': this.token
      },
    })
  }

  DeleteProducts(id){
    const url = `${base_url}/business/inventory/${id}`
    return this.http.delete(url, {
      headers:{
        'x-token': this.token
      },
    })
  }
  
  // Sale ---------------------------------------------------
  
  getSale(id, selectLimit = 0, selectPage = 0){
    const url = `${base_url}/business/sale/${id}?selectLimit=${ selectLimit }&selectPage=${ selectPage }`
    return this.http.get(url, {
      headers:{
        'x-token': this.token
      },
    })
  }

  Sale(
    id, description:[{name: string, quantity: number, money: number, totalValue: number, id: string}]){
    const url = `${base_url}/business/sale/${id}`
    return this.http.post(url, description, {
      headers:{
        'x-token': this.token
      },
    })
  }

  // Spending -----------------------------------------------

  getSpending(id, selectLimit = 0, selectPage = 0){
    const url = `${base_url}/business/spending/${id}?selectLimit=${ selectLimit }&selectPage=${ selectPage }`
    return this.http.get(url, {
      headers:{
        'x-token': this.token
      },
    })
  }

  Spending(
    id, Spending: [
      [{name: string, quantity: number, money: number, totalValue: number}],
      [{name: string, money: number, quantity: number}]
    ]){
    const url = `${base_url}/business/spending/${id}`
    return this.http.post(url, Spending, {
      headers:{
        'x-token': this.token
      },
    })
  }

  // Contacts -----------------------------------------------

  getContact(id){
    const url = `${base_url}/contact/${id}`
    return this.http.get(url, {
      headers:{
        'x-token': this.token
      },
    })
  }

  postContact(id, contact: {name: string, mobile: number, phone: number, email: string}){
    const url = `${base_url}/contact/${id}`
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
}
