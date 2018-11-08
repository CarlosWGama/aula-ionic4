import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tarefa } from '../models/tarefa';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  tarefas: Tarefa[] = [
    new Tarefa(1, 'Descrição 1', '2020-01-01'),
    new Tarefa(2, 'Descrição 2', '2025-01-01')
  ];
  constructor(private menuCtrl:MenuController) { }

  ngOnInit() {
    this.menuCtrl.enable(true);
  }
}
