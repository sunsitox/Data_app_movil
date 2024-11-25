import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TomarMateriaPageRoutingModule } from './tomar-materia-routing.module';

import { TomarMateriaPage } from './tomar-materia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TomarMateriaPageRoutingModule
  ],
  declarations: [TomarMateriaPage]
})
export class TomarMateriaPageModule {}
