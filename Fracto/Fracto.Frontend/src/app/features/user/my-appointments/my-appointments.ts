import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AppointmentService } from '../../../core/services/appointment';
import { RatingService } from '../../../core/services/rating';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-my-appointments',
  standalone: false,
  templateUrl: './my-appointments.html',
  styleUrls: ['./my-appointments.css']
})
export class MyAppointmentsComponent implements OnInit {

  appointments: any[] = [];
  loading = false;
  error = '';
  ratingMap: { [id: number]: number } = {};
  ratedSet = new Set<number>();

  constructor(
    private apptSvc: AppointmentService,
    private ratingSvc: RatingService,
    public auth: AuthService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.load();
  }

  load() {
    this.loading = true;
    this.apptSvc.getAll().subscribe({
      next: (data: any[]) => {
        this.appointments = data.filter(a => a.userId === this.auth.getUserId());
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Could not load appointments.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  cancel(id: number) {
    if (!confirm('Are you sure you want to cancel?')) return;
    this.apptSvc.cancel(id).subscribe({
      next: () => {
        this.load();
        this.cdr.detectChanges();
      },
      error: (err: any) => alert(err.error?.message ?? 'Could not cancel.')
    });
  }

  isPast(date: string): boolean {
    return new Date(date) < new Date();
  }

  submitRating(appt: any) {
    const rating = this.ratingMap[appt.appointmentId];
    if (!rating) return;
    this.ratingSvc.submit({
      doctorId: appt.doctorId,
      userId: this.auth.getUserId(),
      doctorRating: rating
    }).subscribe({
      next: () => this.ratedSet.add(appt.appointmentId),
      error: (err: any) => alert(err.error || 'Rating failed.')
    });
  }
}
