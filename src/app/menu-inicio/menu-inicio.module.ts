import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuInicioPageRoutingModule } from './menu-inicio-routing.module';

import { MenuInicioPage } from './menu-inicio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuInicioPageRoutingModule
  ],
  declarations: [MenuInicioPage]
})
export class MenuInicioPageModule {}
