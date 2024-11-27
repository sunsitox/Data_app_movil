import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarmateriaPageRoutingModule } from './agregarmateria-routing.module';

import { AgregarmateriaPage } from './agregarmateria.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarmateriaPageRoutingModule
  ],
  declarations: [AgregarmateriaPage]
})
export class AgregarmateriaPageModule {}
