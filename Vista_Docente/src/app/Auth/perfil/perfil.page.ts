import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  usuario: any = ""; // Cambié el nombre a 'usuario' para que sea plural y consistente.

  userId: string = " "; //test
  constructor(private router: Router, 
    private route: ActivatedRoute, 
    private auth:AuthService) { }

  ngOnInit() {
    // Captura el parámetro 'id' de la URL
    this.userId = this.route.snapshot.paramMap.get('id') || '';
    console.log('User ID:', this.userId);

    this.obtenerPerfil();

  }

  obtenerPerfil(){

    this.auth.GetUserByUsername(this.userId).subscribe(
      (data:any) => {
        console.log("Datos usuario: ", data);
        this.usuario = data;
      })
  }

  modificarPerfil(){
    this.router.navigate(['/modif-perfil', this.userId]);
  }

  volver() {
    this.router.navigate(['/iniciar', this.userId]);
  }
}
