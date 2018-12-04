import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TarefasService } from './tarefas.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [TarefasService]
})
export class ServicesModule { }
