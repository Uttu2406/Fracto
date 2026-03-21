import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      city: ['', Validators.required],
      specializationId: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.load();
    this.loadSpecs();
  }

  load() {
    this.doctorSvc.getAll().subscribe({
      next: (data: any) => {
        this.doctors = data;
        this.error = ''; 
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.error = 'Failed to load doctors. Your session might have expired.';
      }
    });
  }

  loadSpecs() {
    this.specSvc.getAll().subscribe({
      next: (data: any) => {
        this.specializations = data;
        this.cdr.detectChanges();
      }
    });
  }

  getSpecName(specId: number): string {
    if (!this.specializations || this.specializations.length === 0) {
      return '...';
    }
    const spec = this.specializations.find(s => s.specializationId === specId);
    return spec ? spec.specializationName : 'N/A';
  }

  openAdd() {
    this.editingId = null;
    this.form.reset({ specializationId: null });
    this.showForm = true;
    this.error = '';
    this.success = '';
  }

  openEdit(d: any) {
    this.editingId = d.doctorId;
    this.form.patchValue({
      name: d.name,
      city: d.city,
      specializationId: d.specializationId
    });
    this.showForm = true;
    this.error = '';
    this.success = '';
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const val = this.form.value;
    const payload = {
      ...val,
      specializationId: Number(val.specializationId)
    };

    const req = this.editingId
      ? this.doctorSvc.update(this.editingId, { doctorId: this.editingId, ...payload })
      : this.doctorSvc.create(payload);

    req.subscribe({
      next: () => {
        this.load();
        this.showForm = false;
        this.success = 'Doctor saved successfully!';
        setTimeout(() => this.success = '', 3000);
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        this.error = typeof err.error === 'string' ? err.error : 'Save operation failed.';
        this.cdr.detectChanges();
      }
    });
  }

  delete(id: number) {
    if (!confirm('Are you sure you want to delete this doctor record?')) return;

    this.doctorSvc.delete(id).subscribe({
      next: () => {
        this.load();
        this.success = 'Doctor deleted.';
        setTimeout(() => this.success = '', 2000);
      },
      error: (err: any) => alert(err.error || 'Delete failed.')
    });
  }
}
