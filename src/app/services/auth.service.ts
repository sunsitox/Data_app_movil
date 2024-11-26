import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users, UserNuevo } from 'src/interfaces/users';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  PostUsuario(newUsuario: UserNuevo): Observable<UserNuevo>{
    return this.httpClient.post<Users>(`${environment.apiUrl}/usuarios`, newUsuario)
  }

  GetUserByEmail(email: any): Observable<Users> {
    return this.httpClient.get<Users>(`${environment.apiUrl}/usuarios?email=${email}`);
  }

  GetUserByUsername(username: any): Observable<Users> {
    return this.httpClient.get<Users>(`${environment.apiUrl}/usuarios?username=${username}`);
  }

  login(identifier: string, password: string, isEmail: boolean): Observable<any> {
    const loginEndpoint = isEmail ? `usuarios?email=${identifier}` : `usuarios?username=${identifier}`;
    return this.httpClient.get<any>(`${environment.apiUrl}/${loginEndpoint}&password=${password}`);
  }

}
