import { Directive, Input, ElementRef, Renderer, OnInit } from '@angular/core';

@Directive({
  selector: '[appPrazoBackground]'
})
export class PrazoBackgroundDirective implements OnInit {

  @Input('appPrazoBackground')
  prazo;

  ngOnInit() {
    let hoje = new Date().toISOString().split('T')[0];
    if (hoje > this.prazo) {
      //Fundo vermelho
      this.render.setElementStyle(this.element.nativeElement, 'background-color', '#8B0000');
      //Cor do texto branca
      this.render.setElementStyle(this.element.nativeElement, 'color', 'white');
    }
  }

  constructor(private element:ElementRef, private render:Renderer) { }
}
