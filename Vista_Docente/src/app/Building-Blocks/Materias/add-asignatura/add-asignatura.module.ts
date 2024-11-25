import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddAsignaturaPageRoutingModule } from './add-asignatura-routing.module';

import { AddAsignaturaPage } from './add-asignatura.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddAsignaturaPageRoutingModule
  ],
  declarations: [AddAsignaturaPage]
})
export class AddAsignaturaPageModule {}
