
import { Component, Input, HostListener, ElementRef} from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

    @Input() enable:string='';
    scrollYValue : number = 0;

    constructor (private elementRef:ElementRef){
    }

    @HostListener('window:scroll', ['$event'])
    
    onScroll(event: Event): void {
      this.scrollYValue = window.scrollY;
      const header = this.elementRef.nativeElement.querySelector('nav')
      if (this.scrollYValue === 0) {
        header.classList.remove('med');
      } else {
        header.classList.add('med');
      }

    }
}
