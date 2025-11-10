import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  apiError: string = '';
  isLoading: boolean = false;

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    private _cartService: CartService // Inject CartService
  ) {
    this.loginForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      // Password regex: starts with uppercase, 6-11 chars
      password: ['', [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{5,10}$/)]]
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this._authService.signin(this.loginForm.value).subscribe({
        next: (res) => {
          localStorage.setItem('userToken', res.token);
          this._authService.setLoggedIn(); // Update auth status
          
          // Fetch cart to update count
          this._cartService.getLoggedUserCart().subscribe({
            next: (cartRes) => {
              this._cartService.cartItemCount.next(cartRes.numOfCartItems);
            },
            error: (err) => {
              console.error("Could not fetch cart count", err);
            }
          });
          
          this.isLoading = false;
          this._router.navigate(['/home']);
        },
        error: (err) => {
          this.apiError = err.error.message;
          this.isLoading = false;
        }
      });
    }
  }
}