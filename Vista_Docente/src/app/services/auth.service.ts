import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { Users, UserNuevo, Iclase } from '../../interfaces/users';
import { environment } from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  GetUsuarios(): Observable<Users[]> {
    return this.httpClient.get<Users[]>(`${environment.apiUrl}/usuarios`)
  }

  PostUsuario(newUsuario: UserNuevo): Observable<Users> {
    return this.httpClient.post<Users>(`${environment.apiUrl}/usuarios`, newUsuario);
  }


  GetUserByEmail(email: any): Observable<Users> {
    return this.httpClient.get<Users>(`${environment.apiUrl}/usuarios?email=${email}`);
  }

  GetUserByUsername(username: any): Observable<Users> {
    return this.httpClient.get<Users>(`${environment.apiUrl}/usuarios?username=${username}`);
  }

  // Obtener un usuario por ID
  GetUsuarioById(userId: any): Observable<Users> {
    return this.httpClient.get<Users>(`${environment.apiUrl}/usuarios/${userId}`);
  }

  // Actualizar un usuario por ID
  UpdateUsuario(userId: string, updatedUser: Users): Observable<Users> {
    return this.httpClient.put<Users>(`${environment.apiUrl}/usuarios/${userId}`, updatedUser);
  }

  UpdateUsuarioPerfil(userId: string, updatedFields: Partial<Users>): Observable<any> {
    return this.httpClient.patch(`${environment.apiUrl}/usuarios/${userId}`, updatedFields);
  }

  UpdateUsuarioClases(addClase: Iclase, userId: any): Observable<Users> {
    // Obtenemos el usuario actual para modificar su lista de clases
    return this.httpClient.get<Users>(`${environment.apiUrl}/usuarios/${userId}`).pipe(
      switchMap((usuario) => {
        // Verificamos si el usuario tiene clases, si no, inicializamos el array
        if (!usuario.clases) {
          usuario.clases = [];
        }

        // Añadimos la nueva clase al array de clases
        usuario.clases.push(addClase);

        // Actualizamos solo las clases del usuario
        const payload = { clases: usuario.clases };

        // Usamos PATCH para actualizar únicamente el campo 'clases'
        return this.httpClient.patch<Users>(`${environment.apiUrl}/usuarios/${userId}`, payload);
      })
    );
  }

  login(identifier: string, password: string, isEmail: boolean): Observable<any> {
    const loginEndpoint = isEmail ? `usuarios?email=${identifier}` : `usuarios?username=${identifier}`;
    return this.httpClient.get<any>(`${environment.apiUrl}/${loginEndpoint}&password=${password}`);
  }

  
  
  saveImageToDatabase(userId: any, base64Image: string): Observable<any> {
    const imageData = { img: base64Image };
  
    return this.httpClient.patch(`${environment.apiUrl}/usuarios/${userId}`, imageData);
  }
  

}
