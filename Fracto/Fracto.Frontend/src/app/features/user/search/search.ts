import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DoctorService } from '../../../core/services/doctor';
import { SpecializationService } from '../../../core/services/specialization';

@Component({
  selector: 'app-search',
  standalone: false,
  templateUrl: './search.html',
  styleUrls: ['./search.css']
})
export class SearchComponent implements OnInit {

  form: FormGroup;
  doctors: any[] = [];
  specializations: any[] = [];
  loading = false;
  error = '';
  today = new Date().toISOString().split('T')[0];

  constructor(private fb: FormBuilder, private doctorSvc: DoctorService, private specSvc: SpecializationService, private cdr: ChangeDetectorRef)
  {
    this.form = this.fb.group({
      city: [''],
      specializationId: [''],
      minRating: [''],
      date: ['']
    });
  }

  ngOnInit() {
    this.specSvc.getAll().subscribe((data: any) => {
      this.specializations = data;
      this.cdr.detectChanges();
    });
    this.search();
  }

  search() {
    this.loading = true;
    this.error = '';
    this.doctorSvc.search(this.form.value).subscribe({
      next: (res: any) => {
        this.doctors = Array.isArray(res) ? res : (res.data ?? []);
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Failed to load doctors.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  reset() {
    this.form.reset();
    this.search();
  }
}
