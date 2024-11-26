import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModifPerfilPage } from './modif-perfil.page';

const routes: Routes = [
  {
    path: '',
    component: ModifPerfilPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModifPerfilPageRoutingModule {}
