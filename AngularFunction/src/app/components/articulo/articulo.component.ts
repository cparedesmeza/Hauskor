import { Component, Input, Output,EventEmitter } from '@angular/core';
import { Articulo } from '../../models/articulo';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.component.html',
  styleUrl: './articulo.component.css'
})

export class ArticuloComponent{
  @Input() articulo: Articulo;
  @Output() marcarArticulo = new EventEmitter();
 
  constructor (){
    this.articulo = {sku:'',image:'',description:'',price:'',cent:''};
  }
  btnSelect(event:Event,articulo=this.articulo){
    this.marcarArticulo.emit({
      articulo:articulo
    });
    
    //MENSAJE DE AGREGADO
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Your Article has been saved, Just looking your bag",
      showConfirmButton: false,
      timer: 1900
    });
  }
}
