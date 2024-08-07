import { Component,Input, OnInit,ElementRef,HostListener} from '@angular/core';
import { Articulo } from '../../models/articulo';
import { FunctionService } from '../../services/functions.services';
import { ActivatedRoute,Router,Params} from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  
  @Input() search :string;
  @Input() type: string;
  @Input() nombre: string;

  public articulo : Articulo;
  public status:string;
  public visible: boolean;

  constructor (
    private functionService:FunctionService,
    private _route: ActivatedRoute,
    private _router: Router){
    this.search = '';
    this.articulo = {sku:'',image:'',description:'',price:'',cent:''};
    this.status = '';
    this.visible = false;
    this.type = '';
    this.nombre = '';
    this.mostrarArticulo();
  }
  mostrarArticulo() {

    this._route.params.subscribe((params: Params) => {
      this.search= params ['search'];
      this.visible= params ['visible'];
    });

    this.functionService.getId(this.search).subscribe(
      res=>{
        if(res.status == 'success'){
          this.articulo = res.articles[0];
          this.status = 'success';
          this.visible = true;
        }
      },error=>{
        console.log(error);
        this.status = 'error';
      });
      
  }


  handleClick(event:Event){
    this.visible = false;
    this._router.navigate(['/home'])
  }
}
