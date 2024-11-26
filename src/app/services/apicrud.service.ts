import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IMaterias, IMateria } from 'src/interfaces/Imaterias';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApicrudService {

  constructor(private httpClient: HttpClient) { }

  getMaterias(): Observable<IMaterias[]> {
    return this.httpClient.get<IMaterias[]>(`${environment.apiUrl}/materias`);
  }

  postMateria(newMateria: IMateria): Observable<IMateria> {
    return this.httpClient.post<IMateria>(`${environment.apiUrl}/materias`, newMateria);
  }

  
}
