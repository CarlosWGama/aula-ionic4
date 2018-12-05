import { Component, OnInit, AfterContentInit, AfterViewInit, OnChanges, AfterViewChecked, AfterContentChecked } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tarefa } from '../models/tarefa';
import { MenuController, ToastController } from '@ionic/angular';
import { TarefasService } from '../services/tarefas.service';
import { AdMobFree } from '@ionic-native/admob-free/ngx';
import { FCM } from '@ionic-native/fcm/ngx';
import * as firebase from 'firebase';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  tarefas: Tarefa[] = [];
  constructor(private menuCtrl:MenuController, private tarefasService: TarefasService, public toastController: ToastController, private admobFree: AdMobFree, private fcm: FCM ) { }

  ngOnInit() {

    this.fcm.subscribeToTopic('aula'); //Cadastra para receber mensagens do tópico aula

    //Salva o Token único do dispositivo(celular) do usuário no banco
    this.fcm.getToken().then(token => {
      let uid = firebase.auth().currentUser.uid;
      firebase.database().ref('usuarios/'+uid).set({dispositivo:token});
    });

    //Admob
    this.admobFree.banner.config({
      id: 'ca-app-pub-8890411738087560/2820840976',
      isTesting:true, //Está em ambiente de teste
      autoShow: true
    });

    this.admobFree.banner.prepare();


    this.tarefasService.buscarTodos().then(tarefas => {
      this.tarefas = tarefas
      console.log(this.tarefas);
    });
    this.menuCtrl.enable(true);
  }

  excluir(tarefa:Tarefa) {
    this.tarefasService.excluir(tarefa.id);
    this.ngOnInit();
    this.toastController.create({
      message: "Tarefa: '" + tarefa.descricao + "' excluida",
      duration: 3000
    }).then(toast => toast.present());
  }
}
