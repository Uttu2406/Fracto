import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SpecializationService } from '../../../core/services/specialization';

@Component({
  selector: 'app-manage-specializations',
  standalone: false,
  templateUrl: './manage-specializations.html',
  styleUrls: ['./manage-specializations.css']
})
export class ManageSpecializationsComponent implements OnInit {

  specs: any[] = [];
  form: FormGroup;
  editingId: number | null = null;
  showForm = false;
  error = '';
  success = '';

  constructor(
    private specSvc: SpecializationService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      specializationName: ['', Validators.required]
    });
  }

  ngOnInit() { this.load(); }

  load() {
    this.specSvc.getAll().subscribe(d => this.specs = d);
  }

  openAdd() {
    this.editingId = null;
    this.form.reset();
    this.showForm = true;
    this.error = '';
  }

  openEdit(s: any) {
    this.editingId = s.specializationId;
    this.form.patchValue(s);
    this.showForm = true;
    this.error = '';
  }

  save() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const req = this.editingId
      ? this.specSvc.update(this.editingId, { specializationId: this.editingId, ...this.form.value })
      : this.specSvc.create(this.form.value);
    req.subscribe({
      next: () => {
        this.load();
        this.showForm = false;
        this.success = 'Saved successfully!';
        setTimeout(() => this.success = '', 2000);
      },
      error: err => this.error = err.error || 'Save failed.'
    });
  }

  delete(id: number) {
    if (!confirm('Delete this specialization?')) return;
    this.specSvc.delete(id).subscribe({
      next: () => this.load(),
      error: err => alert(err.error || 'Cannot delete — linked to doctors.')
    });
  }
}
