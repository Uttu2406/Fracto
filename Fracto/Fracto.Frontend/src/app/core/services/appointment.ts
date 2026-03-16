import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AppointmentService {

  private api = `${environment.apiUrl}/appointments`;

  constructor(private http: HttpClient) { }

  getSlots(doctorId: number, date: string): Observable<any> {
    const params = new HttpParams().set('doctorId', doctorId).set('date', date);

    return this.http.get(`${this.api}/slots`, { params });
  }

  book(appointment: any): Observable<any>
  {
    return this.http.post(this.api, appointment);
  }

  getAll(): Observable<any>
  {
    return this.http.get(this.api);
  }


  cancel(id: number): Observable<any>
  {
    return this.http.put(`${this.api}/${id}/cancel`, {});
  }
}
