import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ConfiguracoesPage } from './configuracoes.page';
import { GeralComponent } from './geral/geral.component';
import { InfoComponent } from './info/info.component';

const routes: Routes = [
  {
    path: 'configuracoes',
    component: ConfiguracoesPage,
    children: [
      { path: '', redirectTo: '/configuracoes/(geral:geral)', pathMatch: 'full'},
      { path: 'geral', outlet: 'geral', component: GeralComponent},
      { path: 'info', outlet: 'info', component: InfoComponent }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ConfiguracoesPage, GeralComponent, InfoComponent]
})
export class ConfiguracoesPageModule {}
