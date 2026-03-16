import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-manage-users',
  standalone: false,
  templateUrl: './manage-users.html',
  styleUrls: ['./manage-users.css']
})
export class ManageUsersComponent implements OnInit {

  users: any[] = [];
  form: FormGroup;
  editingId: number | null = null;
  showForm = false;
  error = '';
  success = '';
  private api = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.form = this.fb.group({
      userName: ['', Validators.required],
      emailAddress: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['User', Validators.required]
    });
  }

  ngOnInit() { this.load(); }

  load() {
    this.http.get<any[]>(this.api).subscribe(d => this.users = d);
  }

  openAdd() {
    this.editingId = null;
    this.form.reset({ role: 'User' });
    this.showForm = true;
    this.error = '';
  }

  openEdit(u: any) {
    this.editingId = u.userId;
    this.form.patchValue(u);
    this.showForm = true;
    this.error = '';
  }

  save() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.error = '';
    const req = this.editingId
      ? this.http.put(`${this.api}/${this.editingId}`, { userId: this.editingId, ...this.form.value })
      : this.http.post(this.api, this.form.value);
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
    if (!confirm('Delete this user?')) return;
    this.http.delete(`${this.api}/${id}`).subscribe({
      next: () => this.load(),
      error: err => alert(err.error || 'Delete failed.')
    });
  }
}
