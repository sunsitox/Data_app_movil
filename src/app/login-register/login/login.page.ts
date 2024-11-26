import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  userdata:any;

  usuario={
    id:0,
    username:"",
    email:"",
    password:"",
    isactive:false,
    isAlumno:false,
    isProfesor:false
  }

  formularioLogin: FormGroup;

  constructor(
    private authservice: AuthService, 
    private router: Router, 
    private toast: ToastController,
    private alertcontroller: AlertController, 
    private builder: FormBuilder) {
    
    this.formularioLogin = this.builder.group({
      'identifier': new FormControl("", [Validators.required]),  // Puede ser email o username
      'password': new FormControl("", [Validators.required, Validators.minLength(8)]),
    });
  }

  ngOnInit() { }

  iniciarSesion() {
    // Si el formulario no es válido, no se realiza ninguna acción
    if (!this.formularioLogin.valid) {
      return;
    }
  
    const identifier = this.formularioLogin.value.identifier; // Puede ser email o username
    const password = this.formularioLogin.value.password;
  
    // Se verifica si es un email o un username
    if (this.isEmail(identifier)) {
      this.authservice.GetUserByEmail(identifier).subscribe(resp => {
        this.procesarRespuesta(resp, password);
      });
    } else {
      this.authservice.GetUserByUsername(identifier).subscribe(resp => {
        this.procesarRespuesta(resp, password);
      });
    }
  }
  
  private procesarRespuesta(resp: any, password: string) {
    this.userdata = resp;
    console.log(this.userdata);
  
    if (this.userdata.length === 0) {
      this.formularioLogin.reset();
      this.UsuarioNoExiste();
      return;
    }
  
    this.usuario = {
      id: this.userdata[0].id,
      username: this.userdata[0].username,
      password: this.userdata[0].password,
      email: this.userdata[0].email,
      isactive: this.userdata[0].isactive,
      isAlumno: this.userdata[0].isAlumno,
      isProfesor: this.userdata[0].isProfesor
    };
  
    // Verificación de la contraseña
    if (this.usuario.password !== password) {
      this.formularioLogin.reset();
      this.ErrorUsuario();
      return;
    }
  
    // Verificación si el usuario está activo
    if (!this.usuario.isactive) {
      this.formularioLogin.reset();
      this.UsuarioInactivo();
      return;
    }
  
    // Verificación si es un profesor
    if (!this.usuario.isAlumno) {
      this.formularioLogin.reset();
      this.NoEsAlumno();
      return;
    }
  
    // Si todo es correcto, se inicia sesión
    this.IniciarSesion(this.usuario);
  }
  
  async NoEsAlumno() {
    const alerta = await this.alertcontroller.create({
      header: 'Acceso denegado',
      message: 'Solo los usuarios de tipo Alumno pueden iniciar sesión.',
      buttons: ['OK']
    });
    alerta.present();
  }
  
  private isEmail(identifier: string): boolean {
    // Verifica si el identificador es un email mediante una expresión regular
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(identifier);
  }
  
  private IniciarSesion(usuario: any) {
    sessionStorage.setItem('username', usuario.username);
    sessionStorage.setItem('password', usuario.password);
    sessionStorage.setItem('ingresado', 'true');
    this.showToast('Sesión Iniciada ' + this.usuario.username);
    this.router.navigate(['/tab-inicial/iniciar']);
  }
  
  async showToast(msg: any) {
    const toast = await this.toast.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }
  
  async UsuarioInactivo() {
    const alerta = await this.alertcontroller.create({
      header: 'Usuario inactivo',
      message: 'Contactar a admin@admin.cl',
      buttons: ['OK']
    });
    alerta.present();
  }
  
  async ErrorUsuario() {
    const alerta = await this.alertcontroller.create({
      header: 'Error..',
      message: 'Revise sus credenciales',
      buttons: ['OK']
    });
    alerta.present();
  }
  
  async UsuarioNoExiste() {
    const alerta = await this.alertcontroller.create({
      header: 'No existe...',
      message: 'Debe registrarse..',
      buttons: ['OK']
    });
    alerta.present();
  }
  
  Registrar() {
    this.router.navigate(['/crear-usuario']);
  }

}
