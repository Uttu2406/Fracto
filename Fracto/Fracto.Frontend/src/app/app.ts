import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: false,
  template: `
    <nav class="navbar">
      <div class="nav-logo">Fracto</div>
      <ul class="nav-links">
        <li><a routerLink="/login" routerLinkActive="active">Login</a></li>
        <li><a routerLink="/register" routerLinkActive="active">Register</a></li>
        <li><a routerLink="/search" routerLinkActive="active">Search</a></li>
        <li><a routerLink="/booking" routerLinkActive="active">Booking</a></li>
      </ul>
    </nav>
    <router-outlet></router-outlet>
  `,
  styleUrl: './app.css'
})
export class App { }
