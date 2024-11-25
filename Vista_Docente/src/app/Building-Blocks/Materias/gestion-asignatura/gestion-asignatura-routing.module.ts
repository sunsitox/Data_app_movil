import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GestionAsignaturaPage } from './gestion-asignatura.page';

const routes: Routes = [
  {
    path: '',
    component: GestionAsignaturaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestionAsignaturaPageRoutingModule {}
