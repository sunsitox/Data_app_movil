import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ActivatedRoute } from '@angular/router';


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

  userId: any; //test

  usuarioId:any;
  opciones: Menu[]=[
    {
      icon:'people',
      name:'Inicio',
      redirecTo:'/iniciar/'+sessionStorage.getItem('username')
    },
    {
      icon:'copy',
      name:'Clases',
      redirecTo:'/materias/'+sessionStorage.getItem('username')
    },
    {
      icon:'book-outline',
      name:'Materias',
      redirecTo:'/gestion-asignatura'
    },
    {
      icon:'qr-code-outline',
      name:'Generar QR',
      redirecTo:'/qrcode'
    },
  ]
  constructor(private authservice: AuthService,
    private route: ActivatedRoute) {}

  ngOnInit() {
    // Captura el parámetro 'id' de la URL
  this.userId = this.route.snapshot.paramMap.get('id') || '';
  console.log('User ID:', this.userId);
  // this.usuarioId = this.userId;
  this.usuarioId = sessionStorage.getItem('username');
  }

  

}
