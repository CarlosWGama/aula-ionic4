import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { AutenticacaoGuard } from './guards/autenticacao.guard';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  paginas: {nome: string, url: string, icon: string}[] = [
    {nome: 'Home', url:'/home', icon:'home'},
    {nome: 'Configurações', url:'/configuracoes', icon:'settings'},
  ]


  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router:Router,
    private translate: TranslateService,
    private storage:Storage
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {

      this.storage.get('idioma').then(idioma => {
        if (idioma != null)
          this.translate.use(idioma);
        else
          this.translate.use(navigator.language);
      });

      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  sair() {
    AutenticacaoGuard.podeAcessar = false;
    this.router.navigateByUrl('login');
  }
}
