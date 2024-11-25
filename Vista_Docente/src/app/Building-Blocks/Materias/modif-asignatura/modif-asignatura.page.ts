import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MateriasService } from 'src/app/services/materias.service';

@Component({
  selector: 'app-modif-asignatura',
  templateUrl: './modif-asignatura.page.html',
  styleUrls: ['./modif-asignatura.page.scss'],
})
export class ModifAsignaturaPage implements OnInit {

  materia: any = {
    name: '',
    code: '',
    seccion: ''
  };

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private materiasService: MateriasService
  ) {
    // Se obtienen los parámetros de la ruta
    this.activatedRoute.queryParams.subscribe(params => {
      if (params && params['materia']) {
        this.materia = JSON.parse(params['materia']);
      }
    });
  }

  ngOnInit() {
  }

  ModificarAsignatura(){
    this.materiasService.PutMateria(this.materia).subscribe();
    this.router.navigate(['/gestion-asignatura']);
  }
}
