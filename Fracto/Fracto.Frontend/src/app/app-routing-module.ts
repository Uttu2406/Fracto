import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { LoginComponent } from './features/auth/login/login';
import { RegisterComponent } from './features/auth/register/register';


import { SearchComponent } from './features/user/search/search';
import { DoctorDetailComponent } from './features/user/doctor-detail/doctor-detail';
import { MyAppointmentsComponent } from './features/user/my-appointments/my-appointments';


import { DashboardComponent } from './features/admin/dashboard/dashboard';
import { ManageUsersComponent } from './features/admin/manage-users/manage-users';
import { ManageDoctorsComponent } from './features/admin/manage-doctors/manage-doctors';
import { ManageSpecializationsComponent } from './features/admin/manage-specializations/manage-specializations';
import { ManageAppointmentsComponent } from './features/admin/manage-appointments/manage-appointments';


import { AuthGuard } from './core/guards/auth.guard'; 
import { AdminGuard } from './core/guards/admin.guard'; 

const routes: Routes = [
  { path: '', redirectTo: 'search', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'search', component: SearchComponent },
  { path: 'doctor/:id', component: DoctorDetailComponent },

  
  { path: 'my-appointments', component: MyAppointmentsComponent, canActivate: [AuthGuard] }, 

  { path: 'admin', component: DashboardComponent, canActivate: [AdminGuard] },
  { path: 'admin/users', component: ManageUsersComponent, canActivate: [AdminGuard] },
  { path: 'admin/doctors', component: ManageDoctorsComponent, canActivate: [AdminGuard] },
  { path: 'admin/specializations', component: ManageSpecializationsComponent, canActivate: [AdminGuard] },
  { path: 'admin/appointments', component: ManageAppointmentsComponent, canActivate: [AdminGuard] },

  { path: '**', redirectTo: 'search' } 
];




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
