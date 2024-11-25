import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MateriasService } from 'src/app/services/materias.service';

@Component({
  selector: 'app-detalle-asignatura',
  templateUrl: './detalle-asignatura.page.html',
  styleUrls: ['./detalle-asignatura.page.scss'],
})
export class DetalleAsignaturaPage implements OnInit {

  materia: any = {
    name: '',
    code: '',
    seccion: '',
    horarios: []
  };

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private materiasService: MateriasService) {
    // Se obtienen los parámetros de la ruta
    this.activatedRoute.queryParams.subscribe(params => {
      if (params && params['materia']) {
        this.materia = JSON.parse(params['materia']);
      }
    });
  }

  ngOnInit() {
    // Aquí se pueden cargar más datos si es necesario.
  }

  VerDatos(Observable: any) {
    this.router.navigate(['modif-asignatura', this.materia], {
      queryParams: { materia: JSON.stringify(Observable) }
    });
  }


  EliminarAsignarura() {
    this.materiasService.DeleteMateria(this.materia.id).subscribe();
    this.router.navigate(['/gestion-asignatura']);
  }

  AddHorario() {
  this.router.navigate(['/add-horario', this.materia.id]);
}
}
