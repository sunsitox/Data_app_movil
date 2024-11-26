import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Users } from 'src/interfaces/users';

@Component({
  selector: 'app-modif-perfil',
  templateUrl: './modif-perfil.page.html',
  styleUrls: ['./modif-perfil.page.scss'],
})
export class ModifPerfilPage implements OnInit {
  userId: string = ''; // ID del usuario actual
  user: Partial<Users> = {}; // Almacena los datos actuales y modificados del usuario
  isLoading: boolean = true; // Indicador de carga
  isUpdating: boolean = false; // Indicador de actualización

  constructor(private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    // Obtener el ID del usuario (puedes usar sessionStorage o una ruta)
    this.userId = sessionStorage.getItem('id') || ''; // Ajusta según cómo manejas el usuario actual

    if (this.userId) {
      this.loadUserData();
    } else {
      console.error('No se encontró el ID del usuario.');
    }
  }

  // Cargar los datos actuales del usuario
  loadUserData() {
    this.authService.GetUsuarioById(this.userId).subscribe(
      (data: Users) => {
        this.user = {
          username: data.username,
          password: data.password,
          email: data.email,
          rut: data.rut,
          img: data.img,
        };
        this.isLoading = false;
      },
      (error) => {
        console.error('Error al cargar los datos del usuario:', error);
        this.isLoading = false;
      }
    );
  }

  // Guardar los cambios en el perfil
  saveChanges() {
    this.isUpdating = true;
    let username = sessionStorage.getItem('username');
    this.authService.UpdateUsuarioPerfil(this.userId, this.user).subscribe(
      (response) => {
        console.log('Perfil actualizado:', response);
        this.isUpdating = false;
        alert('Perfil actualizado correctamente.');
        this.router.navigate(['/perfil', username]);
      },
      (error) => {
        console.error('Error al actualizar el perfil:', error);
        this.isUpdating = false;
        alert('Error al actualizar el perfil.');
      }
    );
  }


  onFileSelected(event: any) {
    const file: File = event.target.files[0];
  
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        const userId = sessionStorage.getItem('id'); // Obtiene el ID del usuario
  
        if (!userId) {
          console.error('ID de usuario no encontrado en sessionStorage');
          alert('Error: ID de usuario no encontrado.');
          return;
        }
  
        // Llama al servicio para guardar la imagen
        this.authService.saveImageToDatabase(userId, base64String).subscribe({
          next: (response) => {
            console.log('Imagen actualizada:', response);
            this.user.img = base64String; // Actualiza la vista previa de la imagen
            alert('Imagen actualizada con éxito.');
  
            // Redirige al perfil tras actualizar
            this.volver();
          },
          error: (error) => {
            console.error('Error al actualizar la imagen:', error);
            alert('Error al actualizar la imagen.');
          },
        });
      };
  
      reader.readAsDataURL(file);
    }
  }
  
  // Método para redirigir al perfil
  volver() {
    let username = sessionStorage.getItem('username');
    if (username) {
      this.router.navigate(['/perfil', username]);
    } else {
      console.error('Username no encontrado en sessionStorage');
      alert('Error: No se puede redirigir al perfil porque no se encontró el username.');
    }
  }

}
