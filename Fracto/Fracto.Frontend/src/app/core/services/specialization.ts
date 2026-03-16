import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SpecializationService {

  private api = `${environment.apiUrl}/specializations`;

  constructor(private http: HttpClient) { }



  getAll(): Observable<any>
  {
    return this.http.get(this.api);
  }

  create(spec: any): Observable<any>
  {
    return this.http.post(this.api, spec);
  }

  update(id: number, spec: any): Observable<any>
  {
    return this.http.put(`${this.api}/${id}`, spec);
  }

  delete(id: number): Observable<any>
  {
    return this.http.delete(`${this.api}/${id}`);
  }



}
