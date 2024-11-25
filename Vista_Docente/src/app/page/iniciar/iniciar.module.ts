import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { IniciarPageRoutingModule } from './iniciar-routing.module';
import { IniciarPage } from './iniciar.page';


import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IniciarPageRoutingModule,
  ],
  declarations: [IniciarPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IniciarPageModule {}
