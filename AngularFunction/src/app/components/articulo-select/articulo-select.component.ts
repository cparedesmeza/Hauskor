import { Component, OnInit} from '@angular/core';
import { Articulo } from '../../models/articulo';
import { FunctionService } from '../../services/functions.services';
import { Global } from '../../services/global';
import { error } from 'console';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-articulo-select',
  templateUrl: './articulo-select.component.html',
  styleUrl: './articulo-select.component.css',
  providers:[FunctionService]
})
export class ArticuloSelectComponent implements OnInit{

  public lastArticles: Articulo[] = [];
  public url: string = Global.url;
  public cantidad:[number] = [1];
  public status:string = '';
  public subTotal: [number]=[0];
  public total:number=0;
  public price : number=0;
  public cent : number=0;
 

  constructor (
    private functionService:FunctionService,
    ){}

  ngOnInit(){
    this.saveListArticle();
  }


 saveListArticle (){
  this.functionService.getArticles().subscribe(res=>{
    
    if(res.articles){

      this.lastArticles = res.articles
      for(let lastarticle of this.lastArticles){
    
        let index = this.lastArticles.indexOf(lastarticle);
        this.cantidad[index]=1;
        let cent = parseInt(lastarticle.cent)/100;
        let price = parseInt(lastarticle.price);
        this.subTotal[index] = (price + cent);
        this.subTotal[index].toPrecision(1);
        var suma = this.subTotal.reduce((acumulador, valorActual) => acumulador + valorActual, 0);
        this.total=suma;
      }
    }
  }, error=>{
    console.log(error);
  });

/*
  let articulo = document.createRange().createContextualFragment('<span>popo</span>');
  const article = document.querySelector("article");
  article?.append(articulo);*/
 }

 aritmetic (operation:boolean,index:number){
    
      this.cent = parseInt(this.lastArticles[index].cent)/100;
      this.price = parseInt(this.lastArticles[index].price);
      let subPrice = this.price + this.cent;

      if(operation){  

        this.subTotal[index] = subPrice * this.cantidad[index];
        this.subTotal[index].toPrecision(2);
      }
      else{

        this.subTotal[index] = this.subTotal[index] - subPrice ;
        this.subTotal[index].toPrecision(2);
        if(this.subTotal[index]==Infinity){this.subTotal[index]=0}
      }
      var suma = this.subTotal.reduce((acumulador, valorActual) => acumulador + valorActual, 0);
      this.total=suma;

 }

 Aumentar (index:number){
   
    this.cantidad[index] = this.cantidad[index]+1;
    this.aritmetic(true,index);
 }

 Disminuir(articulo:Articulo,index:number){
    this.cantidad[index] = this.cantidad[index]-1;
    this.aritmetic(false,index);
    if(this.cantidad[index]<1){
      this.cantidad[index] = 1;
      
      //Codigo para buscar en base de datos el sku y obtener el id
      this.functionService.getId(articulo.sku).subscribe(res =>{
        if(res.status=='success'){
          if(res.articles.length > 1){

              let lastOneArticle = res.articles[res.articles.length -1]._id;
              console.log(lastOneArticle);
              //Borro el documento que se esta escogiendo
              this.functionService.deleteArticle(lastOneArticle).subscribe(res=>{
                if(res.status=='success'){
                  window.location.reload();
                }
              },error=>{
                this.status = "error"
                console.log(error + this.status);
              });
 
          }else{
            //Borra el documento si solo es un existente
            console.log(res.articles[0]._id);
            let id = res.articles[0]._id;
            this.functionService.deleteArticle(id).subscribe(res=>{
              if(res.status=='success'){
                window.location.reload();
              }
            },error=>{
              this.status = "error"
              console.log(error + this.status);
            });
          
          }
        }
      },error=>{
        this.status = "error"
        console.log(error);
      });

    
    }
  }

  btnRealizarCompra(){

    this.functionService.getArticles().subscribe(res=>{
      if(res.articles.length>0){
        this.lastArticles = res.articles;

        this.functionService.deleteAllArticles('articles').subscribe(res=>{
          if(res.status){
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Your Articles has been buyed, wait for contacting",
              showConfirmButton: false,
              timer: 1900
            });
            this.ngOnInit();
            this.total=0;
          }
        });
      }
      else{
        Swal.fire({
          position: "center",
          icon: "error",
          title: "There are not articles on your bag",
          showConfirmButton: false,
          timer: 1900
        });
      }
    }, error=>{

    });
  }
  
}
