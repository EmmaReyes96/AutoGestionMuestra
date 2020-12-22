import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import * as printJS from 'print-js'


@Injectable({
  providedIn: 'root',
})

export class SwalCustomService {

  public Array = [];
  public Total;
  public Title;

  constructor() { }

  SwalConfim(msg){
    Swal.fire({
      title:'Listo', 
      text: msg, 
      icon:'success',
      allowOutsideClick: false,
      allowEnterKey: true,
      stopKeydownPropagation: false,
      allowEscapeKey: false,
      confirmButtonColor: '#0191b4',
      confirmButtonText: 'Aceptar',
    }).then((result) => {
      if(result.isConfirmed){
        location.reload()
      }
    })
  }

  SwalError(err){
    Swal.fire({
      title:'Error', 
      text: err.error.msg, 
      icon:'error',
      allowOutsideClick: false,
      allowEnterKey: true,
      stopKeydownPropagation: false,
      allowEscapeKey: false,
      confirmButtonColor: '#0191b4',
      confirmButtonText: 'Aceptar'
    })
  }

  SwalErrorMsg(msg){
    Swal.fire({
      title:'Error', 
      text: msg, 
      icon:'error',
      allowOutsideClick: false,
      allowEnterKey: true,
      stopKeydownPropagation: false,
      allowEscapeKey: false,
      confirmButtonColor: '#0191b4',
      confirmButtonText: 'Aceptar'
    })
  }

  SwalPrint(msg){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-info',
        cancelButton: 'btn btn-secondary'
      }
    })
    
    swalWithBootstrapButtons.fire({
      title:'Quieres imprimir o continuar?', 
      text: msg, 
      icon:'info',
      allowOutsideClick: false,
      allowEnterKey: true,
      stopKeydownPropagation: false,
      allowEscapeKey: false,
      confirmButtonColor: '#0191b4',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Imprimir',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
          location.reload()
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        this.Title = 'Gracias por su Compra';
        this.Print()
        swalWithBootstrapButtons.fire(
          'Finalizar'
        ).then(() => {
          location.reload()
        })
      }
    })
  }

  Print(){
    const array = this.Array
    printJS({
      printable: array, 
      type: 'json', 
      header: `<h2 class="title">${ this.Title }</h2> <p>El total de su compra fue de $ ${ this.Total }</p>`,
      properties: [
        { field: 'name', displayName: 'Nombre'},
        { field: 'quantity', displayName: 'Cantidad'},
        { field: 'money', displayName: 'Monto'},
        { field: 'totalValue', displayName: 'Valor Total'},
    ],
      style: '.title { text-align: center; }',
      gridStyle: 'text-align: center; border: 0.5px solid rgb(200, 200, 200);'
    })
  }
  

}
