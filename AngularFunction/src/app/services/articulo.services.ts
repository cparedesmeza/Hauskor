import { Injectable } from "@angular/core";
import { Articulo } from "../models/articulo";

@Injectable()
export class ArticuloService{
    public articles: Articulo[];
    constructor (){
        this.articles =[
            new Articulo('st0','https://img.kwcdn.com/product/fancy/75d41e09-31a4-432c-9901-9a5f92ba9c0a.jpg?imageView2/2/w/800/q/70/format/webp','Estatuilla de perro globo','299','86'),
            new Articulo('st1','https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/3dc39f59c32afce7aa7253775d548f59.jpg?imageView2/2/w/800/q/70/format/webp','Perro Salchicha Pintado En Colores','314','69'),
            new Articulo('jr0','https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/e71ac8b1cb9aeefc1f9d77050f2ae80b.jpg?imageView2/2/w/800/q/70/format/webp','Jarrones de cerámica decoración de mesa','450','49'),
            new Articulo('ptv0','https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/f212179d4ef50acd43a4d80108ef433c.jpg?imageView2/2/w/800/q/70/format/webp','3pcs/set Portavelas','299','97'),
            new Articulo('jr1','https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/e36d6691f5169b90981d4e365254a73f.jpg?imageView2/2/w/800/q/70/format/webp','1pc Florero de vidrio decorativo','229','49'),
            new Articulo('bdj0','https://img.kwcdn.com/product/fancy/e0d50e97-6a42-499a-9d10-9b914d7d7ebe.jpg?imageView2/2/w/800/q/70/format/webp','Bandeja decorativa redonda de madera de 27.94 cm','179','69'),
            new Articulo('sht0','https://img.kwcdn.com/product/fancy/5d012b8e-a816-40d6-92d7-e1c5fc4cc96e.jpg?imageView2/2/w/800/q/70/format/webp','5 piezas de hojas de ginkgo artificial','169','98'),
            new Articulo('sht1','https://img.kwcdn.com/product/fancy/3afcf553-84cc-4cf4-b653-b04e9c8b58a1.jpg?imageView2/2/w/800/q/70/format/webp','Mantel Boho Para Decoración Del Hogar','149','37'),
            new Articulo('st2','https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/c2dc4b960bf04fbf39c201d4393eb0ba.jpg?imageView2/2/w/800/q/70/format/webp','Estatua de resina de mujer leyendo','74','81'),
            new Articulo('sht1','https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/b69dbba3488b91c24524c6197849a8fe.jpg?imageView2/2/w/800/q/70/format/webp','Juego De 4/6 Piezas, Decoración De Mesa','220','98'),
            new Articulo('cj1','https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/86851c70d10e29fac4901b7132984b1e.jpg?imageView2/2/w/800/q/70/format/webp','Juego De 4 Fundas De Cojín Estilo Boho Étnico, 45.72*45.72cm','206','99'),
            new Articulo('st3','https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/32de8dcad47cf840a45612c7c84096ec.jpg?imageView2/2/w/800/q/70/format/webp','1pc Libélula Metal Pequeños Adornos','53','99')
        ]
    }
}