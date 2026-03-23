import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {

  stats = {
    users: 0,
    doctors: 0,
    specializations: 0,
    appointments: 0
  };

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.loadStats();
  }

  loadStats() {
    this.http.get<any[]>(`${environment.apiUrl}/users`).subscribe(d => {
      this.stats.users = d.length;
      this.cdr.detectChanges();
    });
    this.http.get<any[]>(`${environment.apiUrl}/doctors`).subscribe(d => {
      this.stats.doctors = d.length;
      this.cdr.detectChanges();
    });
    this.http.get<any[]>(`${environment.apiUrl}/specializations`).subscribe(d => {
      this.stats.specializations = d.length;
      this.cdr.detectChanges();
    });
    this.http.get<any[]>(`${environment.apiUrl}/appointments`).subscribe(d => {
      this.stats.appointments = d.length;
      this.cdr.detectChanges();
    });
  }
}
