import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { DoctorSearch } from './components/doctor-search/doctor-search';
import { Booking } from './components/booking/booking';

const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'search', component: DoctorSearch },
  { path: 'booking', component: Booking },

  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
