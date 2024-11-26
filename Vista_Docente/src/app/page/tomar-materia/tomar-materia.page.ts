import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MateriasService } from 'src/app/services/materias.service';
import { Iclase, Users } from 'src/interfaces/users';


@Component({
  selector: 'app-tomar-materia',
  templateUrl: './tomar-materia.page.html',
  styleUrls: ['./tomar-materia.page.scss'],
})
export class TomarMateriaPage implements OnInit {

  usuario:Users = {
    id:"",
    username:"",
    password:"",
    email:"",
    rut:"",
    img: "",
    clases:[],
    isactive:false,
    isAlumno:false,
    isProfesor:false
  }

  clase:Iclase= {
    name:"",
    code:"",
    seccion:""
  }

  materias:any[] = [];

  constructor(private router: Router,
    private route: ActivatedRoute,
    private materiasService: MateriasService,
    private authservice: AuthService) { }

    ngOnInit() {
      // Primero, obtenemos el usuario
      this.obtenerUsuario();
    }
    

  asignarMateria(materias: any): void {
    this.clase.name = materias.name;
    this.clase.code = materias.code;
    this.clase.seccion = materias.seccion;

    // console.log('Clase seleccionada:', this.clase);

    // Asegúrate de que clases sea un array
    if (!this.usuario.clases) {
      this.usuario.clases = [];
      // console.log('Inicializando clases como un array vacío.');
    }

    this.usuario.clases.push({ ...this.clase }); // Asegúrate de no pasar referencias

    console.log('Usuario actualizado:', this.usuario);

    // Envía el usuario actualizado al backend
    this.authservice.UpdateUsuarioClases(this.clase, sessionStorage.getItem('id')).subscribe(
      data => {
        console.log('Usuario actualizado en el backend:', data);
        
        this.router.navigateByUrl('/materias/'+sessionStorage.getItem('username'))
      },
      error => {
        console.error('Error al actualizar usuario:', error);
      }
    );
  }

  obtenerUsuario(): void {
    this.authservice.GetUserByUsername(sessionStorage.getItem('username')).subscribe(
      (data: any) => {
        this.usuario = data[0];
  
        // Asegúrate de que `clases` esté definido como un array
        if (!Array.isArray(this.usuario.clases)) {
          this.usuario.clases = [];
        }
  
        console.log("Usuario obtenido:", this.usuario);
        this.obtenerMaterias();
        
      },
      (error) => {
        console.error("Error al obtener usuario:", error);
      }
    );
  }

  obtenerMaterias(): void {
    this.materiasService.GetMaterias().subscribe(
      (data: any[]) => {
        console.log("Materias disponibles:", data);
  
        // Filtrar materias que no estén en las clases del usuario
        console.log("Usuario obtenido obtenerMaterias :", this.usuario);
        this.materias = data.filter(materia => {
          return !this.usuario.clases.some((clase: any) => clase.code === materia.code);
        });
  
        console.log("Materias no asignadas:", this.materias);
      },
      (error) => {
        console.error("Error al obtener materias:", error);
      }
    );
  }

  volver(){
    this.router.navigateByUrl('/materias/'+sessionStorage.getItem('username'))
  }
}
