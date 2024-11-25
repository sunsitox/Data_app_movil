import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MateriasService } from 'src/app/services/materias.service';
import { IHorario } from 'src/interfaces/Imaterias';  // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-add-horario',
  templateUrl: './add-horario.page.html',
  styleUrls: ['./add-horario.page.scss'],
})
export class AddHorarioPage implements OnInit {
  // Definir el formulario 
  horario: IHorario = {
    dia: '',
    hora_inicio: '',
    hora_fin: ''
  };

  horarioForm: FormGroup;
  materiaId: any;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private materiasService: MateriasService
  ) {
    // Inicializar el formulario
    this.horarioForm = this.formBuilder.group({
      dia: ['', Validators.required],
      hora_inicio_horas: ['', [Validators.required, Validators.min(0), Validators.max(23)]],
      hora_inicio_minutos: ['', [Validators.required, Validators.min(0), Validators.max(59)]],
      hora_fin_horas: ['', [Validators.required, Validators.min(0), Validators.max(23)]],
      hora_fin_minutos: ['', [Validators.required, Validators.min(0), Validators.max(59)]]
    });
  }

  ngOnInit() {
    // Obtener el ID de la materia de los parámetros de la ruta
    this.activatedRoute.params.subscribe(params => {
      this.materiaId = params['id'];
    });
  }

  agregarHorario() {
    if (this.horarioForm.valid) {
      // Formar los valores de hora_inicio y hora_fin en formato HH:mm
      const horaInicio = `${this.pad(this.horarioForm.value.hora_inicio_horas)}:${this.pad(this.horarioForm.value.hora_inicio_minutos)}`;
      const horaFin = `${this.pad(this.horarioForm.value.hora_fin_horas)}:${this.pad(this.horarioForm.value.hora_fin_minutos)}`;
  
      this.horario.dia = this.horarioForm.value.dia;
      this.horario.hora_inicio = horaInicio;
      this.horario.hora_fin = horaFin;
  
      // Llamada al servicio para agregar el nuevo horario
      this.materiasService.PostHorario(this.horario, this.materiaId).subscribe(() => {
        this.horarioForm.reset();
        this.router.navigateByUrl('/gestion-asignatura');
      }, error => {
        console.error('Error al añadir el horario', error);
      });
    } else {
      console.log('El formulario no es válido', this.horarioForm.value);
    }
  }

  cancelar() {
    this.router.navigate(['/gestion-asignatura']);
  }

  // Función para añadir un 0 si el valor es menor a 10 (para formato HH:mm)
  pad(value: number): string {
    return value < 10 ? '0' + value : value.toString();
  }
}
