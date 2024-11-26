import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MateriasService } from 'src/app/services/materias.service';

interface Horario {
  clase: string;
  dia: string;
  hora: string;
}

@Component({
  selector: 'app-materias',
  templateUrl: './materias.page.html',
  styleUrls: ['./materias.page.scss'],
})
export class MateriasPage implements OnInit {
  userId: string = ''; // Inicialización adecuada
  user_data: any[] = []; // Clases del usuario
  materias_data: any[] = []; // Materias filtradas
  horariosPorDia: { [dia: string]: Horario[] } = {}; // Agrupación por días
  isListVisible = false;


  constructor(
    private menuController: MenuController,
    private auth: AuthService,
    private materias: MateriasService,
    private router: Router
  ) { }

  
  ngOnInit() {
    // Captura el parámetro 'id' del sessionStorage
    this.userId = sessionStorage.getItem('username') || '';
    console.log('User ID:', this.userId);

    if (this.userId) {
      this.auth.GetUserByUsername(this.userId).subscribe(
        (data: any) => {
          if (data && data.length > 0) {
            console.log('Usuario: ', data[0].clases);
            this.user_data = data[0].clases || [];
            console.log('User Data: ', this.user_data);
            this.filtrarMaterias();
          }
        },
        (error) => {
          console.error('Error al obtener datos del usuario:', error);
        }
      );
    }
  }


  filtrarMaterias() {
    this.materias.GetMaterias().subscribe(
      (data: any[]) => {
        console.log('Materias: ', data);

        // Filtrar materias según las clases del usuario
        this.materias_data = data.filter((materia) =>
          this.user_data.some((clase: any) => clase.code === materia.code)
        );

        console.log('Materias filtradas: ', this.materias_data);
        this.organizarPorDias();
      },
      (error) => {
        console.error('Error al obtener materias:', error);
      }
    );
  }

  getDias(): string[] {
    // Obtener los días de la semana presentes en horariosPorDia
    const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    return diasSemana.filter(dia => this.horariosPorDia[dia]);
  }
  
  organizarPorDias() {
    const horarios: { [dia: string]: Horario[] } = {};

    // Recorrer materias filtradas y agrupar por días
    this.materias_data.forEach((materia) => {
      materia.horarios.forEach((horario: any) => {
        const dia = horario.dia;
        const horaInicio = horario.hora_inicio;

        if (!horarios[dia]) {
          horarios[dia] = [];
        }

        horarios[dia].push({
          clase: materia.name,
          dia: dia,
          hora: horaInicio,
        });
      });
    });

    // Ordenar las clases dentro de cada día por hora de inicio
    for (const dia in horarios) {
      horarios[dia].sort((a, b) => a.hora.localeCompare(b.hora));
    }

    this.horariosPorDia = horarios;
    console.log('Horarios por día:', this.horariosPorDia);
  }

  toggleList() {
    this.isListVisible = !this.isListVisible;
  }

  mostrarMenu() {
    this.menuController.open('first');
  }

  tomarMateria() {
    this.router.navigateByUrl('/tomar-materia/' + this.userId);
  }
}
