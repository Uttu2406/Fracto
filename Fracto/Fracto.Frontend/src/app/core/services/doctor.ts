import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class DoctorService {

  private api = `${environment.apiUrl}/doctors`;

  constructor(private http: HttpClient) { }

  search(filters: any): Observable<any> {

    let params = new HttpParams();


    if (filters.city) {
      params = params.set('city', filters.city);
    }

    if (filters.specializationId) {
      params = params.set('specializationId', filters.specializationId);
    }

    if (filters.minRating) {
      params = params.set('minRating', filters.minRating);
    }

    if (filters.date) {
      params = params.set('date', filters.date);
    }


    return this.http.get(`${this.api}/search`, { params });
  }


  getById(id: number): Observable<any> {
    return this.http.get(`${this.api}/${id}`);
  }


  getAll(): Observable<any> {
    return this.http.get(this.api);
  }


  create(doctor: any): Observable<any> {
    return this.http.post(this.api, doctor);
  }


  update(id: number, doctor: any): Observable<any> {
    return this.http.put(`${this.api}/${id}`, doctor);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }
}
