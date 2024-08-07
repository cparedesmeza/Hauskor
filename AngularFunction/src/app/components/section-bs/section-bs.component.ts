import { Component } from '@angular/core';
import { Articulo } from '../../models/articulo';
import { ArticuloService } from '../../services/articulo.services';

@Component({
  selector: 'app-section-bs',
  templateUrl: './section-bs.component.html',
  styleUrl: './section-bs.component.css',
  providers:[ArticuloService]
})
export class SectionBSComponent {
 
  public articles: Articulo[];

  constructor( private articuloService: ArticuloService){
    this.articles= this.articuloService.articles;
  }
}
