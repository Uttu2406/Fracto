import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AppointmentService } from '../../../core/services/appointment';

@Component({
  selector: 'app-manage-appointments',
  standalone: false,
  templateUrl: './manage-appointments.html',
  styleUrls: ['./manage-appointments.css']
})
export class ManageAppointmentsComponent implements OnInit {

  appointments: any[] = [];
  loading = false;

  constructor(
    private apptSvc: AppointmentService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() { this.load(); }

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

  cancel(id: number) {
    if (!confirm('Cancel this appointment?')) return;
    this.apptSvc.cancel(id).subscribe({
      next: () => this.load()
    });
  }
}
