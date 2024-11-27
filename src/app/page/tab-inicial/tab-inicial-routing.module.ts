import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabInicialPage } from './tab-inicial.page';

const routes: Routes = [
  {
    path: 'tab-inicial',
    component: TabInicialPage,
    children: [
      {
        path: '', // Ruta predeterminada que redirige a 'iniciar'
        redirectTo: '/tab-inicial/iniciar',
        pathMatch: 'full'
      },
      {
        path: 'iniciar',
        loadChildren: () => import('./../../page/iniciar/iniciar.module').then(m => m.IniciarPageModule)
      },
      {
        path: 'materias',
        loadChildren: () => import('./../../page/materias/materias.module').then(m => m.MateriasPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabInicialPageRoutingModule {}
