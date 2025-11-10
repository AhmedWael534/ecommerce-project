import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService } from '../../core/services/orders.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;
  cartId: string | null = null;
  apiError: string = '';
  isLoading: boolean = false;

  constructor(
    private _fb: FormBuilder,
    private _route: ActivatedRoute,
    private _ordersService: OrdersService,
    private _router: Router
  ) {
    this.checkoutForm = this._fb.group({
      details: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
      city: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Get the cart ID from the route query params
    this.cartId = this._route.snapshot.queryParamMap.get('cartId');
  }

  // 1. Cash Payment
  createCashOrder(): void {
    if (this.checkoutForm.valid && this.cartId) {
      this.isLoading = true;
      this._ordersService.createCashOrder(this.cartId, this.checkoutForm.value).subscribe({
        next: (res) => {
          this.isLoading = false;
          // Redirect to all orders page after success
          this._router.navigate(['/allorders']);
        },
        error: (err) => {
          this.isLoading = false;
          this.apiError = err.error.message;
        }
      });
    }
  }

  // 2. Online Payment
  createOnlineOrder(): void {
    if (this.checkoutForm.valid && this.cartId) {
      this.isLoading = true;
      this._ordersService.checkoutSession(this.cartId, this.checkoutForm.value).subscribe({
        next: (res) => {
          this.isLoading = false;
          // Redirect to the Stripe payment URL
          if (res.session.url) {
            window.location.href = res.session.url;
          }
        },
        error: (err) => {
          this.isLoading = false;
          this.apiError = err.error.message;
        }
      });
    }
  }
}