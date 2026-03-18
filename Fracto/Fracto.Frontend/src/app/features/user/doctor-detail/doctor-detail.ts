import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorService } from '../../../core/services/doctor';
import { AppointmentService } from '../../../core/services/appointment';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-doctor-detail',
  standalone: false,
  templateUrl: './doctor-detail.html',
  styleUrls: ['./doctor-detail.css']
})
export class DoctorDetailComponent implements OnInit {

  doctor: any = null;
  slots: string[] = [];
  selectedSlot = '';
  selectedDate = '';
  loading = false;
  slotsLoading = false;
  error = '';
  success = '';
  today = new Date().toISOString().split('T')[0];

  constructor(
    private route: ActivatedRoute,
    private doctorSvc: DoctorService,
    private apptSvc: AppointmentService,
    public auth: AuthService,
    private router: Router,
    private cdr : ChangeDetectorRef
  ) { }

  ngOnInit() {
  
    const id = this.route.snapshot.paramMap.get('id');
    this.loading = true;

    this.doctorSvc.getById(Number(id)).subscribe({
      next: d => {
        console.log('Doctor data :', d);
        this.doctor = d;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Doctor not found.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  onDateChange() {
    if (!this.selectedDate) return;
    this.slots = [];
    this.selectedSlot = '';
    this.slotsLoading = true;

    this.apptSvc.getSlots(this.doctor.doctorId, this.selectedDate).subscribe({
      next: (res: any) => {
        this.slots = Array.isArray(res) ? res : [];
        this.slotsLoading = false;
      },
      error: () => { this.slotsLoading = false; }
    });
  }


  book() {
    if (!this.auth.isLoggedIn())
    {
      this.router.navigate(['/login']);
      return;
    }

    if (!this.selectedSlot || !this.selectedDate)
    {
      this.error = 'Please select a date and time slot.';
      return;
    }

    this.error = '';
    this.success = '';

    const payload = {
      userId: this.auth.getUserId(),
      doctorId: this.doctor.doctorId,
      appointmentDate: this.selectedDate,
      timeSlot: this.selectedSlot,
      status: 'Confirmed'
    };

    this.apptSvc.book(payload).subscribe({
      next: (res: any) => {
        this.success = res.message ?? 'Appointment booked successfully!';
        this.slots = this.slots.filter(s => s !== this.selectedSlot);
        this.selectedSlot = '';
      },
      error: err => {
        this.error = err.error || 'Booking failed. Try again.';
      }
    });
  }
}
