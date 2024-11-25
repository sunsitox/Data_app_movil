import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { IMaterias, IMateria, IHorario  } from '../../interfaces/Imaterias'; // Asegúrate de importar tus interfaces
import { environment } from '../../environments/environment'; // Ajusta la ruta según sea necesario

@Injectable({
  providedIn: 'root'
})
export class MateriasService {

  constructor(private httpClient: HttpClient) { }

  // Obtener todas las materias
  GetMaterias(): Observable<IMaterias[]> {
    return this.httpClient.get<IMaterias[]>(`${environment.apiUrl}/materias`);
  }

  // Agregar una nueva materia
  PostMateria(addMateria: IMateria): Observable<IMateria> {
    return this.httpClient.post<IMateria>(`${environment.apiUrl}/materias`, addMateria);
  }
  

  // Editar una materia existente (por su ID)
  PutMateria(materia:any): Observable<IMateria> {
    return this.httpClient.put<IMateria>(`${environment.apiUrl}/materias/${materia.id}`, materia);
  }

  // Eliminar una materia (por su ID)
  DeleteMateria(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${environment.apiUrl}/materias/${id}`);
  }

  // Agregar un horario a una materia
  PostHorario(addHorario: IHorario, idMateria: any): Observable<any> {
    // Primero obtenemos la materia para obtener los horarios actuales
    return this.httpClient.get<IMateria>(`${environment.apiUrl}/materias/${idMateria}`).pipe(
      switchMap((materia) => {
        // Agregamos el nuevo horario a los horarios existentes
        materia.horarios.push(addHorario);

        // Luego, actualizamos la materia completa (incluyendo el array de horarios actualizado)
        return this.httpClient.put(`${environment.apiUrl}/materias/${idMateria}`, materia);
      })
    );
}

  // Editar un horario existente (por su ID)
  PutHorario(id: number, updateHorario: IHorario): Observable<IHorario> {
    return this.httpClient.put<IHorario>(`${environment.apiUrl}/horarios/${id}`, updateHorario);
  }

  // Eliminar un horario (por su ID)
  DeleteHorario(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${environment.apiUrl}/horarios/${id}`);
  }
}
