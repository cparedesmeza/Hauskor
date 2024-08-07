import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Global } from "./global";
import { Articulo } from "../models/articulo";

@Injectable()
export class FunctionService {

    public url : string;
    public status: string;

    constructor (private _http: HttpClient){
        this.url = Global.url;
        this.status = '';
    }
    
    saveArticles (article: Articulo):Observable<any>{
        let params = JSON.stringify(article);
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.post(this.url + 'save',params,{headers:headers});
    }

    getArticles():Observable<any>{
        
        return  this._http.get(this.url+ 'articles');
    }

    deleteArticle (_id:any):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.delete(this.url + 'article/'+_id,{headers:headers});
    }
    
    getId (searchString:string):Observable<any>{
       return this._http.get(this.url +'search/'+ searchString);  
           
    }
    deleteAllArticles(collectionName:string):Observable<any>{
        
        const options = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
            }),
            body: {
                collectionName:collectionName
            },
          }; 
        return this._http.delete(this.url+'articles',options)
    }
}      
    

 


