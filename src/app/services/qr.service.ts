import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Qr, QrNuevo } from 'src/interfaces/iqr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QRService {


  constructor(private http: HttpClient) {}

  // Servicio para enviar un QR (crear uno nuevo)
  QrPost(qrData: QrNuevo): Observable<Qr> {
    return this.http.post<Qr>(`${environment.apiUrl}/Qr`, qrData);
  }

  // Servicio para obtener todos los QR
  QrGet(): Observable<Qr[]> {
    return this.http.get<Qr[]>(`${environment.apiUrl}/qr`);
  }

  // Servicio para obtener un QR por ID
  QrGetById(id: string): Observable<Qr> {
    return this.http.get<Qr>(`${environment.apiUrl}/qr/${id}`);
  }

}
