import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { Qr, QrNuevo } from '../../interfaces/IQr';
import { environment } from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class QrService {

  constructor(private httpClient: HttpClient) { }

  // put qr
  PutQr(qr:any): Observable<any> {
    return this.httpClient.put<any>(`${environment.apiUrl}/qr/${qr.id}`, qr);
  }

  // post qr
  PostQr(newQr: QrNuevo): Observable<Qr> {
    return this.httpClient.post<Qr>(`${environment.apiUrl}/qr`, newQr);
  }

  // get qr by id
  GetQrById(qrId: string): Observable<Qr> {
    return this.httpClient.get<Qr>(`${environment.apiUrl}/qr/${qrId}`);
  }

  getQrs(){
    return this.httpClient.get<Qr[]>(`${environment.apiUrl}/qr`)
  }

  // delete qr
  DeleteQr(qrId: string): Observable<void> {
    return this.httpClient.delete<void>(`${environment.apiUrl}/qr/${qrId}`);
  }


}
