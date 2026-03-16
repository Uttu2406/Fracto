import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {

  form: FormGroup;
  error = '';
  success = '';
  loading = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group(
      {
        userName: ['', [Validators.required, Validators.minLength(3)]],
        emailAddress: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required]
      },
      {
        validators: this.passwordMatch
      }
    );
  }

  passwordMatch(g: AbstractControl) {
    const pass = g.get('password')?.value;
    const confirm = g.get('confirmPassword')?.value;
    return pass === confirm ? null : { mismatch: true };
  } // stole this from some stackoverflow answer 

  
  get userName()
  {
    return this.form.get('userName')!;
  }
  get email()
  {
    return this.form.get('emailAddress')!;
  }
  get pass()
  {
    return this.form.get('password')!;
  }
  get confirm()
  {
    return this.form.get('confirmPassword')!;
  }


  submit()
  {
    if (this.form.invalid)
    {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.error = '';

    this.auth.register(this.form.value).subscribe({
      next: () => {
        // Show success message then redirect to login
        this.success = 'Account created! Redirecting to login...';
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: err => { // kina error? :(
        this.error = err.error || 'Registration failed. Try again.';
        this.loading = false;
      }
    });
  }


}
