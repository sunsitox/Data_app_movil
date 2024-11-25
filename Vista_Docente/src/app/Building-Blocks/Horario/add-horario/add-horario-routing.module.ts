import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddHorarioPage } from './add-horario.page';

const routes: Routes = [
  {
    path: '',
    component: AddHorarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddHorarioPageRoutingModule {}
