import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddHorarioPageRoutingModule } from './add-horario-routing.module';

import { AddHorarioPage } from './add-horario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddHorarioPageRoutingModule
  ],
  declarations: [AddHorarioPage]
})
export class AddHorarioPageModule {}
