import { Component,HostListener } from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',

})
export class LoginComponent {
  public secciones: Array<string> = ['ACERCA','EXPERIENCIA','CONTACTO',];
  public correo:string='cparedesmeza@gmail.com'
  
  
  
}
