import { Component, OnInit, AfterContentInit, AfterViewInit, OnChanges, AfterViewChecked, AfterContentChecked } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tarefa } from '../models/tarefa';
import { MenuController, ToastController } from '@ionic/angular';
import { TarefasService } from '../services/tarefas.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  tarefas: Tarefa[] = [];
  constructor(private menuCtrl:MenuController, private tarefasService: TarefasService, public toastController: ToastController ) { }

  ngOnInit() {
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
