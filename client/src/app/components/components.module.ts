import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableComponent } from './table/table.component';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  declarations: [
    ModalComponent,
    TableComponent,
  ],
  exports:[
    ModalComponent,
    TableComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
  ]
})
export class ComponentsModule { }
