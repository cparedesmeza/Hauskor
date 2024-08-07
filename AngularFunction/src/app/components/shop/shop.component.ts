import { Component, OnInit} from '@angular/core';
import { Articulo } from '../../models/articulo';
import { ArticuloService } from '../../services/articulo.services';
import { FunctionService } from '../../services/functions.services';
import { ActivatedRoute, Router,Params} from '@angular/router';



@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
  providers:[
    [ArticuloService], 
    [FunctionService],
  ]
})
export class ShopComponent implements OnInit{

  public articles: Articulo[];
  public articuloSelect : Articulo;
  public status : string;
  public id : string;
 
  constructor(
    private _articuloService: ArticuloService, 
    private functionService:FunctionService,
    private _route: ActivatedRoute,
    private _router: Router
  ){
    this.id = '';
    this.articles= this._articuloService.articles;
    this.status = '';
    this.articuloSelect = {sku:'',image:'',description:'',price:'',cent:''};
  }
  ngOnInit (){
    this._route.params.subscribe((params: Params) => {
      this.id = params ['id'];
    });
  }

  guardarArticuloBag(event:{articulo:Articulo}){
    
    // SE GUARDA EL VALOR DEL ARTICULO EN ARTICLES MONGODB Y RETORNA EL VALOR EN STRING DE OBJECTID
    this.functionService.saveArticles(event.articulo).subscribe(
      res =>{
      if(res.status == 'success'){

        this.id = res.article;
       // this._router.navigate(['/bag/',this.id]);
        
      }else{
        this.status = 'error en escribir';
      }
    }, error =>{
      console.log(error);
      this.status = 'error system';
    });
  }
  mostrarArticulo(event:{articulo:Articulo}){
    this.articuloSelect = event.articulo;
  }

}
