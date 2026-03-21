import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AppointmentService } from '../../../core/services/appointment';
import { DoctorService } from '../../../core/services/doctor';

@Component({
  selector: 'app-manage-appointments',
  standalone: false,
  templateUrl: './manage-appointments.html',
  styleUrls: ['./manage-appointments.css']
})
export class ManageAppointmentsComponent implements OnInit {

  appointments: any[] = [];
  doctors: any[] = [];
  loading = false;

  constructor(
    private apptSvc: AppointmentService,
    private doctorSvc: DoctorService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.load();
    this.loadDoctors();
  }

  load() {
    this.loading = true;
    this.apptSvc.getAll().subscribe({
      next: (d: any) => {
        this.appointments = d;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  loadDoctors() {
    this.doctorSvc.getAll().subscribe({
      next: (data: any) => {
        this.doctors = data;
        this.cdr.detectChanges();
      }
    });
  }

  getDoctorName(doctorId: number): string {
    if (!this.doctors.length) return 'Loading...';
    const doc = this.doctors.find(d => d.doctorId === doctorId);
    return doc ? doc.name : 'Unknown Doctor';
  }

  cancel(id: number) {
    if (!confirm('Cancel this appointment?')) return;
    this.apptSvc.cancel(id).subscribe({
      next: () => this.load()
    });
  }
}
