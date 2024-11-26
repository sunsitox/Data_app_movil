import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { UserNuevo } from 'src/interfaces/users';
import { AlertController, NavController } from '@ionic/angular';

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

    formularioRegistro: FormGroup;

    nuevoUsuario: UserNuevo = {
        username: "",
        password: "",
        email: "",
        rut: "",
        isactive: false,
        isAlumno: false,
        isProfesor:false
    }

    userData: any;

    constructor(private fBuilder: FormBuilder,
        private alertController: AlertController,
        private nabCtrl: NavController,
        private authService: AuthService,
        private router: Router) {

        this.formularioRegistro = this.fBuilder.group({

            "username": new FormControl("", [Validators.required, Validators.minLength(3)]),
            "password": new FormControl("", [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)]),
            "confirmacionPassword": new FormControl("", [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)]),
            "email": new FormControl("", [Validators.required, Validators.email]),
            "rut": new FormControl("", [Validators.required, Validators.pattern(/^[0-9]{1,2}\.?[0-9]{3}\.?[0-9]{3}-[0-9Kk]{1}$/)]),
        }, { validators: this.passwordsMatchValidator})
    }

    ngOnInit() {
    }

    passwordsMatchValidator(formGroup: FormGroup) {
        const password = formGroup.get('password')?.value;
        const confirmacionPassword = formGroup.get('confirmacionPassword')?.value;
        return password === confirmacionPassword ? null : { passwordsMismatch: true }
    }


    CrearUsuario(){
        if (this.formularioRegistro.valid){
          this.authService.GetUserByEmail(this.formularioRegistro.value.username).subscribe(resp=>{
            this.userData = resp; 
            if(this.userData.length>0){
               this.formularioRegistro.reset();
              this.errorDuplicidad();
            }
            else{
              this.nuevoUsuario.username = this.formularioRegistro.value.username;
              this.nuevoUsuario.password = this.formularioRegistro.value.password;
              this.nuevoUsuario.email = this.formularioRegistro.value.email;
              this.nuevoUsuario.rut = this.formularioRegistro.value.rut;
              this.nuevoUsuario.isactive=true;
              this.nuevoUsuario.isAlumno=true;
              this.authService.PostUsuario(this.nuevoUsuario).subscribe();
              this.formularioRegistro.reset();
              this.mostrarMensaje();
              this.router.navigateByUrl('/menu-inicio');
            }
          })
        }
      }

    async mostrarMensaje() {
        const ALERTA = await this.alertController.create({
            header: 'Usuario creado',
            message: 'Bienvenid@ ' + this.nuevoUsuario.username,
            buttons: ['OK']
        });
        ALERTA.present();
    }

    async errorDuplicidad() {
        const ALERTA = await this.alertController.create({
            header: 'Error..',
            message: 'Usted ' + this.nuevoUsuario.username + ' ya esta registrado',
            buttons: ['OK']
        });
        ALERTA.present();
    }

}
