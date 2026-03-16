import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private api = `${environment.apiUrl}/account`;

  constructor(private http: HttpClient, private router: Router) { }

  register(data: any): Observable<any> {
    return this.http.post(`${this.api}/register`, data);
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.api}/login`, data, { responseType: 'text' }).pipe(
      tap((token: string) => {
        localStorage.setItem('token', token);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

 
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getPayload(): any {

    const token = this.getToken();

    if (!token)
    {
      return null;
    }

    try
    {
      return JSON.parse(atob(token.split('.')[1])); // jwt ko bichhako token matra
    }

    catch
    {
      return null;
    }
  }

  getRole(): string {
    const payload = this.getPayload();
    if (!payload) return '';
    return payload['role'] ?? '';
  }

  getUserId(): number {
    const payload = this.getPayload();
    if (!payload) return 0;
    return parseInt(payload['nameid'] ?? '0');
  }

  isAdmin(): boolean
  {
    return this.getRole() === 'Admin';
  }
}
