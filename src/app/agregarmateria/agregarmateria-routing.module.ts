import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarmateriaPage } from './agregarmateria.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarmateriaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarmateriaPageRoutingModule {}
