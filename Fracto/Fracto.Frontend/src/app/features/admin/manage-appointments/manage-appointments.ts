import { Component, OnInit } from '@angular/core';
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

  constructor(private apptSvc: AppointmentService) { }

  ngOnInit() { this.load(); }

  load() {
    this.loading = true;
    this.apptSvc.getAll().subscribe({
      next: d => {
        this.appointments = d;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  cancel(id: number) {
    if (!confirm('Cancel this appointment?')) return;
    this.apptSvc.cancel(id).subscribe({
      next: () => this.load()
    });
  }
}
