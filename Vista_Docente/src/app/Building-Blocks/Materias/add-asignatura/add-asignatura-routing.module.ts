import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddAsignaturaPage } from './add-asignatura.page';

const routes: Routes = [
  {
    path: '',
    component: AddAsignaturaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddAsignaturaPageRoutingModule {}
