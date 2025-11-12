import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  updateDataForm: FormGroup;
  updatePasswordForm: FormGroup;

  isLoadingData: boolean = false;
  isLoadingPassword: boolean = false;

  dataApiError: string = '';
  passwordApiError: string = '';

  constructor(
    private _fb: FormBuilder,
    public _authService: AuthService,
    private _toastr: ToastrService
  ) {
    this.updateDataForm = this._fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]]
    });

    this.updatePasswordForm = this._fb.group({
      currentPassword: ['', Validators.required],
      password: ['', [Validators.required, Validators.pattern(/^[A-Z][a-zA-Z0-9]{5,10}$/)]],
      rePassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    this._authService.userData.subscribe(user => {
      if (user) {
        this.updateDataForm.patchValue({
          name: user.name,
          email: user.email,
          phone: user.phone
        });
      }
    });
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const rePassword = control.get('rePassword');

    if (password && rePassword && password.value !== rePassword.value) {
      return { mismatch: true };
    }
    return null;
  }

  // Update Logged user data
  onUpdateData(): void {
    if (this.updateDataForm.valid) {
      this.isLoadingData = true;
      this.dataApiError = '';

      this._authService.updateMyData(this.updateDataForm.value).subscribe({
        next: (res) => {
          this.isLoadingData = false;
          this._toastr.success('Your data has been updated successfully');
          console.log(res);
        },
        error: (err) => {
          this.isLoadingData = false;
          this.dataApiError = err.error.message || 'An error occurred';
          this._toastr.error(this.dataApiError);
        }
      });
    }
  }

  // (PUT) Update Logged user password
  onUpdatePassword(): void {
    if (this.updatePasswordForm.valid) {
      this.isLoadingPassword = true;
      this.passwordApiError = '';

      this._authService.updateMyPassword(this.updatePasswordForm.value).subscribe({
        next: (res) => {
          this.isLoadingPassword = false;
          this._toastr.success('Password changed successfully! Please log in again.');
          this._authService.logout();
        },
        error: (err) => {
          this.isLoadingPassword = false;
          this.passwordApiError = err.error.message || 'An error occurred';
          this._toastr.error(this.passwordApiError);
        }
      });
    }
  }
}