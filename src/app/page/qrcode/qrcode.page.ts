import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { QRService } from 'src/app/services/qr.service';
import { QrNuevo } from 'src/interfaces/iqr';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.page.html',
  styleUrls: ['./qrcode.page.scss'],
})
export class QRcodePage implements OnInit {
  materia: any = {}; // Información de la materia
  qr: any;
  qrdata: QrNuevo = {
    clase: '',
    code: '',
    seccion: '',
    profesor: '',
    alumno: '',
    fecha_generacion: '',
    hora_generacion: '',
    hora_validacion: '',
    estado: false
  }; // Datos para el QR

  nombreUsuario: string = ''; // Nombre del usuario

  constructor(
    private qrservice: QRService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    // Recuperar parámetros de la URL
    this.activatedRoute.queryParams.subscribe((params) => {
      try {
        const materiaParam = params['materia'];
        if (materiaParam) {
          this.materia = JSON.parse(materiaParam); // Parsear los datos de la materia
          console.log('Datos de materia recibidos:', this.materia);
        } else {
          console.warn('No se recibieron datos de materia.');
          this.materia = { id: 'Sin ID', nombre: 'Sin nombre', codigo: 'Sin código' };
        }
      } catch (error) {
        console.error('Error al parsear los datos de la materia:', error);
        this.materia = { id: 'Sin ID', nombre: 'Sin nombre', codigo: 'Sin código' };
      }
    });

    // Recuperar el nombre del usuario desde sessionStorage
    this.nombreUsuario = sessionStorage.getItem('username') || 'Usuario no identificado';
  }

  ngOnInit() {
    console.log('Datos cargados:', {
      materia: this.materia,
      usuario: this.nombreUsuario,
    });
  }

  // Generar QR con los datos de la materia, hora y fecha
  generarQr() {
    const fechaHora = new Date(); // Obtener la fecha y hora actuales

    this.qrdata.clase = this.materia.name;
    this.qrdata.code = this.materia.code;
    this.qrdata.seccion = this.materia.seccion;
    this.qrdata.alumno = "";
    this.qrdata.fecha_generacion = fechaHora.toLocaleDateString();
    this.qrdata.hora_generacion = fechaHora.toLocaleTimeString();

    // Convertir los datos a JSON para el QR
     // Formatear el JSON para que sea legible

    this.qrservice.QrPost(this.qrdata)
    this.qrservice.QrPost(this.qrdata).subscribe(response => {
      console.log('QR creado:', response);
      this.qr = JSON.stringify(response, null, 2);
    });
   }

  // Navegar de vuelta
  volver() {
    this.router.navigate(['iniciar']);
  }
}
