import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  currentStep: number = 1; 
  forgotForm: FormGroup;
  verifyForm: FormGroup;
  resetForm: FormGroup;
  apiError: string = '';
  isLoading: boolean = false;
  userEmail: string = '';

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _router: Router
  ) {
    this.forgotForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
    this.verifyForm = this._fb.group({
      resetCode: ['', [Validators.required]]
    });
    this.resetForm = this._fb.group({
      newPassword: ['', [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{5,10}$/)]]
    });
  }

  // Send email
  sendCode(): void {
    if (this.forgotForm.valid) {
      this.isLoading = true;
      this.userEmail = this.forgotForm.value.email; // Store email
      this._authService.forgotPassword(this.forgotForm.value).subscribe({
        next: (res) => {
          this.isLoading = false;
          this.apiError = '';
          this.currentStep = 2;
        },
        error: (err) => {
          this.isLoading = false;
          this.apiError = err.error.message;
        }
      });
    }
  }

  // Verify code
  verifyCode(): void {
    if (this.verifyForm.valid) {
      this.isLoading = true;
      this._authService.verifyResetCode(this.verifyForm.value).subscribe({
        next: (res) => {
          this.isLoading = false;
          this.apiError = '';
          this.currentStep = 3;
        },
        error: (err) => {
          this.isLoading = false;
          this.apiError = err.error.message;
        }
      });
    }
  }

  // Reset password
  resetPassword(): void {
    if (this.resetForm.valid) {
      this.isLoading = true;
      let resetData = {
        email: this.userEmail,
        newPassword: this.resetForm.value.newPassword
      };
      this._authService.resetPassword(resetData).subscribe({
        next: (res) => {
          this.isLoading = false;
          // Redirect to login
          this._router.navigate(['/auth/login']);
        },
        error: (err) => {
          this.isLoading = false;
          this.apiError = err.error.message;
        }
      });
    }
  }
}