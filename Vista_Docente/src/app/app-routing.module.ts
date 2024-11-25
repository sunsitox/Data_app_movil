import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'menu-inicio',
    pathMatch: 'full'
  },
  // {
  //   path: '',
  //   loadChildren: () => import('./page/tab-inicial/tab-inicial.module').then(m => m.TabInicialPageModule)
  // },
  {
    path: 'menu-inicio',
    loadChildren: () => import('./menu-inicio/menu-inicio.module').then(m => m.MenuInicioPageModule)
  },
  {
    path: 'iniciar/:username',
    loadChildren: () => import('./page/iniciar/iniciar.module').then(m => m.IniciarPageModule)
  },
  {
    path: 'materias/:username',
    loadChildren: () => import('./page/materias/materias.module').then(m => m.MateriasPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login-register/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'qrcode',
    loadChildren: () => import('./page/qrcode/qrcode.module').then(m => m.QRcodePageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./login-register/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'gestion-asignatura',
    loadChildren: () => import('./Building-Blocks/Materias/gestion-asignatura/gestion-asignatura.module').then(m => m.GestionAsignaturaPageModule)
  },
  {
    path: 'add-asignatura',
    loadChildren: () => import('./Building-Blocks/Materias/add-asignatura/add-asignatura.module').then(m => m.AddAsignaturaPageModule)
  },
  {
    path: 'detalle-asignatura',
    loadChildren: () => import('./Building-Blocks/Materias/detalle-asignatura/detalle-asignatura.module').then(m => m.DetalleAsignaturaPageModule)
  },
  {
    path: 'modif-asignatura',
    loadChildren: () => import('./Building-Blocks/Materias/modif-asignatura/modif-asignatura.module').then(m => m.ModifAsignaturaPageModule)
  },
  {
    path: 'add-horario',
    loadChildren: () => import('./Building-Blocks/Horario/add-horario/add-horario.module').then(m => m.AddHorarioPageModule)
  },
  {
    path: 'perfil/:id',
    loadChildren: () => import('./Auth/perfil/perfil.module').then(m => m.PerfilPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
