import { Component } from '@angular/core';

interface Menu{
  icon:string
  name:string
  redirecTo:string
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  opciones: Menu[]=[
    {
      icon:'people',
      name:'Inicio',
      redirecTo:'/tab-inicial/iniciar'
    },
    {
      icon:'copy',
      name:'Materias',
      redirecTo:'/tab-inicial/materias'
    },
    {
      icon:'qr-code-outline',
      name:'QR',
      redirecTo:'/qrcode'
    },
  ]
  constructor() {}
}
