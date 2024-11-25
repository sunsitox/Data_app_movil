import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MateriasService } from 'src/app/services/materias.service';
import { IMateria } from 'src/interfaces/Imaterias';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-asignatura',
  templateUrl: './add-asignatura.page.html',
  styleUrls: ['./add-asignatura.page.scss'],
})
export class AddAsignaturaPage {

  materia: IMateria = {
    name: "",
    code: "",
    seccion: "",
    horarios: []
  };

  materiaForm: FormGroup;

  constructor(
    private fBuilder: FormBuilder,
    private materiasService: MateriasService,
    private alertController: AlertController,
    private router: Router
  ) {
    // Solo validaciones síncronas en el segundo argumento
    this.materiaForm = this.fBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      code: ['', [Validators.required, Validators.minLength(6)]],
      seccion: ['', Validators.required],
    });
  }
  

  CrearMateria() {
    if (this.materiaForm.valid) {
      this.materia.name = this.materiaForm.value.name;
      this.materia.code = this.materiaForm.value.code;
      this.materia.seccion = this.materiaForm.value.seccion;
      this.materiasService.PostMateria(this.materia).subscribe();
      this.materiaForm.reset();
      this.mostrarMensaje();
      this.router.navigateByUrl('/gestion-asignatura');
    } else {
      console.log('El formulario no es válido');
      this.error();
    }
  }

  async mostrarMensaje() {
    const ALERTA = await this.alertController.create({
      header: 'Asignatura creada',
      message: 'Asignatura creada correctamente "' + this.materia.name + '"',
      buttons: ['OK']
    });
    ALERTA.present();
  }

  async error() {
    const ALERTA = await this.alertController.create({
      header: 'Error..',
      message: 'Por favor llenar todos los campos',
      buttons: ['OK']
    });
    ALERTA.present();
  }
}
