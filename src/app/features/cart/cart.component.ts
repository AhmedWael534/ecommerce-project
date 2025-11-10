import { Component, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { Cart, CartItem } from '../../core/interfaces/api-models';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: Cart | null = null;

  constructor(private _cartService: CartService) {}

  ngOnInit(): void {
    this.getCart();
  }

  getCart(): void {
    this._cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        this.cart = res.data;
      }
    });
  }

  removeItem(productId: string): void {
    this._cartService.removeSpecificCartItem(productId).subscribe({
      next: (res) => {
        this.cart = res.data;
      }
    });
  }

  updateQuantity(productId: string, count: number): void {
    if (count < 1) {
      this.removeItem(productId);
      return;
    }
    this._cartService.updateCartQuantity(productId, count).subscribe({
      next: (res) => {
        this.cart = res.data;
      }
    });
  }

  clearCart(): void {
    this._cartService.clearUserCart().subscribe({
      next: (res) => {
        this.cart = null;
        this._cartService.cartItemCount.next(0);
      }
    });
  }
}