import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DoctorService } from '../../../core/services/doctor';
import { SpecializationService } from '../../../core/services/specialization';

@Component({
  selector: 'app-manage-doctors',
  standalone: false,
  templateUrl: './manage-doctors.html',
  styleUrls: ['./manage-doctors.css']
})
export class ManageDoctorsComponent implements OnInit {

  doctors: any[] = [];
  specializations: any[] = [];
  form: FormGroup;
  editingId: number | null = null;
  showForm = false;
  error = '';
  success = '';

  constructor(
    private doctorSvc: DoctorService,
    private specSvc: SpecializationService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      city: ['', Validators.required],
      specializationId: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.load();
    this.specSvc.getAll().subscribe(d => this.specializations = d);
  }

  load() {
    this.doctorSvc.getAll().subscribe(d => this.doctors = d);
  }

  openAdd() {
    this.editingId = null;
    this.form.reset();
    this.showForm = true;
    this.error = '';
  }

  openEdit(d: any) {
    this.editingId = d.doctorId;
    this.form.patchValue(d);
    this.showForm = true;
    this.error = '';
  }

  save() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const req = this.editingId
      ? this.doctorSvc.update(this.editingId, { doctorId: this.editingId, ...this.form.value })
      : this.doctorSvc.create(this.form.value);
    req.subscribe({
      next: () => {
        this.load();
        this.showForm = false;
        this.success = 'Saved successfully!';
        setTimeout(() => this.success = '', 2000);
      },
      error: (err: any) => this.error = err.error || 'Save failed.'
    });
  }

  delete(id: number) {
    if (!confirm('Delete this doctor?')) return;
    this.doctorSvc.delete(id).subscribe({
      next: () => this.load(),
      error: (err: any) => alert(err.error || 'Delete failed.')
    });
  }
}
