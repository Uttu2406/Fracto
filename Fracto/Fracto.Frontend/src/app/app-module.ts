import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Login } from './components/login/login';
import { DoctorSearch } from './components/doctor-search/doctor-search';
import { Booking } from './components/booking/booking';
import { Register } from './components/register/register';

@NgModule({
  declarations: [
    App,
    Login,
    DoctorSearch,
    Booking,
    Register
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
  ],
  bootstrap: [App]
})
export class AppModule { }
