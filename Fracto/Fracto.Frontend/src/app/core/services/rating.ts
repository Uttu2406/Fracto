import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class RatingService {

  private api = `${environment.apiUrl}/ratings`;

  constructor(private http: HttpClient) { }


  submit(rating: { doctorId: number; userId: number; doctorRating: number }): Observable<any>
  {
    return this.http.post(this.api, rating);
  }


}

