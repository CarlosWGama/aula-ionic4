import { Directive, Input, ElementRef, Renderer, OnInit } from '@angular/core';

@Directive({
  selector: '[appPrazoBackground]'
})
export class PrazoBackgroundDirective implements OnInit {

  @Input('appPrazoBackground')
  prazo;

  ngOnInit() {
    let hoje = new Date().toISOString().split('T')[0];
    //Fundo vermelho
    if (hoje > this.prazo) {
      this.render.setElementProperty(this.element.nativeElement, 'color', 'danger');
    }
  }

  constructor(private element:ElementRef, private render:Renderer) { }
}
