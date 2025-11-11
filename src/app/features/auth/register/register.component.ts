import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  apiError: string = '';
  isLoading: boolean = false;

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _router: Router
  ) {
    this.registerForm = this._fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{5,10}$/)]],
      rePassword: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]]
    }, { validators: this.passwordMatchValidator });
  }

  // Custom validator to check if password and rePassword match
  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('rePassword')?.value
      ? null : { 'mismatch': true };
  }

  register(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this._authService.signup(this.registerForm.value).subscribe({
        next: (res) => {
          this.isLoading = false;
          // Navigate to login page after successful registration
          this._router.navigate(['/auth/login']);
        },
        error: (err) => {
          this.apiError = err.error.message;
          this.isLoading = false;
        }
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}