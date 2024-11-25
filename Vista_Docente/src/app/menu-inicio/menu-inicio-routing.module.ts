import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuInicioPage } from './menu-inicio.page';

const routes: Routes = [
  {
    path: '',
    component: MenuInicioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuInicioPageRoutingModule {}
