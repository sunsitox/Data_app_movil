import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GestionAsignaturaPageRoutingModule } from './gestion-asignatura-routing.module';

import { GestionAsignaturaPage } from './gestion-asignatura.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GestionAsignaturaPageRoutingModule
  ],
  declarations: [GestionAsignaturaPage]
})
export class GestionAsignaturaPageModule {}
