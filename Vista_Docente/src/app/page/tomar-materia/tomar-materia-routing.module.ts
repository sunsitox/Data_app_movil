import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TomarMateriaPage } from './tomar-materia.page';

const routes: Routes = [
  {
    path: '',
    component: TomarMateriaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TomarMateriaPageRoutingModule {}
