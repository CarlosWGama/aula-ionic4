import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

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

  constructor(private translate: TranslateService, private storage: Storage, private router:Router) { }

    
  ngOnInit() {
    console.log(this.translate.instant('SETTINGS'));
  }

  salvar() {
    this.translate.use(this.idioma);
    this.storage.set("idioma", this.idioma);
    //window.location.reload();
  }

}
