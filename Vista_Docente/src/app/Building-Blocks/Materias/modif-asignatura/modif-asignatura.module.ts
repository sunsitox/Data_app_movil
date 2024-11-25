import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModifAsignaturaPageRoutingModule } from './modif-asignatura-routing.module';

import { ModifAsignaturaPage } from './modif-asignatura.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModifAsignaturaPageRoutingModule
  ],
  declarations: [ModifAsignaturaPage]
})
export class ModifAsignaturaPageModule {}
