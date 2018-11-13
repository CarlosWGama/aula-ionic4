import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataBrasilPipe } from './data-brasil.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DataBrasilPipe],
  exports:[DataBrasilPipe]
})
export class PipesModule { }
