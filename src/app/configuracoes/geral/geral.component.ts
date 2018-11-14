import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-geral',
  templateUrl: './geral.component.html',
  styleUrls: ['./geral.component.scss']
})
export class GeralComponent implements OnInit {

  idioma: string = 'pt-BR';
  idiomas: {idioma: string, sigla: string}[] = [
    { idioma: "Português", sigla: 'pt-BR' },
    { idioma: "English", sigla: 'en' }
  ]

  constructor() { }

  ngOnInit() {
  }

  salvar() {
    console.log(this.idioma);
  }

}
