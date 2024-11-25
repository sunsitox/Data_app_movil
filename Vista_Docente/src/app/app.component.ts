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

  usuarioId:any = sessionStorage.getItem('username');;
  opciones: Menu[]=[
    {
      icon:'people',
      name:'Inicio',
      redirecTo:'/iniciar/'+this.usuarioId
    },
    {
      icon:'copy',
      name:'Clases',
      redirecTo:'/materias/'+this.usuarioId
    },
    {
      icon:'book-outline',
      name:'Asignar Materia',
      redirecTo:'/gestion-asignatura'
    },
    {
      icon:'qr-code-outline',
      name:'Escanear QR',
      redirecTo:'/qrcode'
    },
  ]
  constructor(private authservice: AuthService,
    private route: ActivatedRoute) {}

  ngOnInit() {
    // Captura el parámetro 'id' de la URL
  this.userId = this.route.snapshot.paramMap.get('id') || '';
  console.log('User ID:', this.usuarioId);
  
  }

  obtener(){
    this.usuarioId = sessionStorage.getItem('username');
    console.log(this.usuarioId);
  }

  cerrar(){
    localStorage.clear();
    sessionStorage.clear();
  }

}
