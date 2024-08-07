import { Component, Input } from '@angular/core';
import { FunctionService } from '../../services/functions.services';
import { Articulo } from '../../models/articulo';
import { ActivatedRoute, Router,Params} from '@angular/router';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css',

})
export class SliderComponent{
  
  @Input() type: string;
  @Input() nombre: string;

  public valorInput :string;
  public visible : boolean;
 
  
  constructor (
    private functionService : FunctionService,
    private _route: ActivatedRoute,
    private _router: Router){
    this.type = '';
    this.nombre = '';
    this.valorInput = '';
    this.visible = true;

  }


  btnBuscar (event:Event,flag:boolean){
    this._router.navigate(['/home', this.valorInput,this.visible]);


  }

}
