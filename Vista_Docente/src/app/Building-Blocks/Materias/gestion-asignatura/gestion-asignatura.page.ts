import { Component, OnInit } from '@angular/core';
import { MateriasService } from 'src/app/services/materias.service';
import { IMaterias } from 'src/interfaces/Imaterias';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestion-asignatura',
  templateUrl: './gestion-asignatura.page.html',
  styleUrls: ['./gestion-asignatura.page.scss'],
})
export class GestionAsignaturaPage implements OnInit {

  materias: IMaterias[] = [];


  constructor(private materiasService: MateriasService, 
    private router: Router) { }

  ngOnInit() {
    this.materiasService.GetMaterias().subscribe(
      (data) => {
        console.log(data);
        this.materias = data;
      });
  }

  AddAsignatura(){
    console.log("Añadir asignatura");
    this.router.navigate(['add-asignatura']);
  }

  modificarAsignatura(Observable: any){
    this.router.navigate(['detalle-asignatura',this.materias], {
      queryParams: { materia: JSON.stringify(Observable) }
    });
    console.log("Modificar asignatura");
  }

  volver(){
    this.router.navigate(['/iniciar/'+sessionStorage.getItem('username')]);
  }
}
