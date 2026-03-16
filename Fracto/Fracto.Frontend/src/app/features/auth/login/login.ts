import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {


  form: FormGroup;
  error = '';
  loading = false;

  constructor( private fb: FormBuilder,private auth: AuthService,private router: Router)
  {
    this.form = this.fb.group(
      {
        emailAddress: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
      }
    );
  }


  get email() { return this.form.get('emailAddress')!; } // NOT Email laataa!!!
  get password() { return this.form.get('password')!; }


  submit() {
    if (this.form.invalid)
    {
      this.form.markAllAsTouched();
      return;
    }


    this.loading = true;
    this.error = '';


    this.auth.login({
      emailAddress: this.form.value.emailAddress,
      password: this.form.value.password,
      userName: "Loginattempt",
      role: 'user'
    }).subscribe({
      next: (res: any) => {
        
        const tokenValue = res.token || res;
        localStorage.setItem('token', tokenValue);

        
        if (this.auth.isAdmin())
        {
          this.router.navigate(['/admin']);
        }

        else {
          this.router.navigate(['/search']);
        }
      },


      error: err => {
        this.error = err.error || 'Invalid email or password.';
        this.loading = false;
      }

    });
  }


}
