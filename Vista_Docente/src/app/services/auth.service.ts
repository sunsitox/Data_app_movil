import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users, UserNuevo } from '../../interfaces/users';
import { environment } from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  GetUsuarios(): Observable<Users[]>{
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
  UpdateUsuario(userId: any, updatedUser: Users): Observable<Users> {
    return this.httpClient.put<Users>(`${environment.apiUrl}/usuarios/${userId}`, updatedUser);
  }

  login(identifier: string, password: string, isEmail: boolean): Observable<any> {
    const loginEndpoint = isEmail ? `usuarios?email=${identifier}` : `usuarios?username=${identifier}`;
    return this.httpClient.get<any>(`${environment.apiUrl}/${loginEndpoint}&password=${password}`);
  }

  a(){
    return this.httpClient.get<any>(`${environment.apiUrl}/usuarios`);
  }

}
