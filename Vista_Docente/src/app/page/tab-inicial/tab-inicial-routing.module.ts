import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabInicialPage } from './tab-inicial.page';

const routes: Routes = [
  {
    path: 'tab-inicial',
    component: TabInicialPage,
    children: [
      {
        path: 'iniciar/:username',
        loadChildren: () => import('./../../page/iniciar/iniciar.module').then(m => m.IniciarPageModule)
      },
      {
        path: 'materias/:username',
        loadChildren: () => import('./../../page/materias/materias.module').then(m => m.MateriasPageModule)
      },
      {
        path: '',
        redirectTo: 'iniciar', // Redirige a una ruta sin el parámetro
        pathMatch: 'full'
      },
    ]
  },
  {
    path: '',
    redirectTo: 'tab-inicial', // Redirige al tab principal
    pathMatch: 'full'
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabInicialPageRoutingModule {}
