import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'menu-inicio', // Redirige a 'menu-inicio' si la ruta está vacía
    pathMatch: 'full'
  },
  {
    path: 'iniciar',
    loadChildren: () => import('./page/iniciar/iniciar.module').then(m => m.IniciarPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login-register/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'materias',
    loadChildren: () => import('./page/materias/materias.module').then(m => m.MateriasPageModule)
  },
  {
    path: 'menu-inicio',
    loadChildren: () => import('./menu-inicio/menu-inicio.module').then(m => m.MenuInicioPageModule)
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
    path: '',
    loadChildren: () => import('./page/tab-inicial/tab-inicial.module').then(m => m.TabInicialPageModule) // Carga un módulo por defecto
  },
  {
    path: 'user-info',
    loadChildren: () => import('./page/user-info/user-info.module').then( m => m.UserInfoPageModule)
  },
  {
    path: 'agregarmateria',
    loadChildren: () => import('./agregarmateria/agregarmateria.module').then( m => m.AgregarmateriaPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }) // Preload all modules
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
