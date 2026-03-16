import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing-module';
import { AppComponent } from './app';
import { AuthInterceptor } from './core/interceptors/auth-interceptor';


// Shared haru
import { HeaderComponent } from './shared/header/header';
import { StarRatingComponent } from './shared/star-rating/star-rating';


// Auth ko page
import { LoginComponent } from './features/auth/login/login';
import { RegisterComponent } from './features/auth/register/register';


// User ko page
import { SearchComponent } from './features/user/search/search';
import { DoctorDetailComponent } from './features/user/doctor-detail/doctor-detail';
import { MyAppointmentsComponent } from './features/user/my-appointments/my-appointments';


// Admin ko page
import { DashboardComponent } from './features/admin/dashboard/dashboard';
import { ManageUsersComponent } from './features/admin/manage-users/manage-users';
import { ManageDoctorsComponent } from './features/admin/manage-doctors/manage-doctors';
import { ManageSpecializationsComponent } from './features/admin/manage-specializations/manage-specializations';
import { ManageAppointmentsComponent } from './features/admin/manage-appointments/manage-appointments';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    StarRatingComponent,
    LoginComponent,
    RegisterComponent,
    SearchComponent,
    DoctorDetailComponent,
    MyAppointmentsComponent,
    DashboardComponent,
    ManageUsersComponent,
    ManageDoctorsComponent,
    ManageSpecializationsComponent,
    ManageAppointmentsComponent,
  ],


  imports: [
    BrowserModule,        
    AppRoutingModule,     
    ReactiveFormsModule,  
    FormsModule,         
    HttpClientModule,     // Api call ko lai
  ],


  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true } // interceptorrrrrr
  ],


  bootstrap: [AppComponent] 

})

export class AppModule { }
