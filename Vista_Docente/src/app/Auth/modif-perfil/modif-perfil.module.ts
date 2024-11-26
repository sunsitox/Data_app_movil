import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModifPerfilPageRoutingModule } from './modif-perfil-routing.module';

import { ModifPerfilPage } from './modif-perfil.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModifPerfilPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ModifPerfilPage]
})
export class ModifPerfilPageModule {}
