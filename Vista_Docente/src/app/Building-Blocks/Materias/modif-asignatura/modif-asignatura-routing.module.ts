import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModifAsignaturaPage } from './modif-asignatura.page';

const routes: Routes = [
  {
    path: '',
    component: ModifAsignaturaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModifAsignaturaPageRoutingModule {}
