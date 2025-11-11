import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist.service';
import { Product } from '../../core/interfaces/api-models';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { SeeMorePipe } from '../../shared/pipes/see-more.pipe';
import { AuthService } from '../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, RouterModule, SeeMorePipe],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})

export class WishlistComponent implements OnInit {
  wishlistProducts: Product[] = [];

  constructor(
    private _wishlistService: WishlistService,
    private _cartService: CartService,
    private _authService: AuthService,
    private _toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getWishlist();
  }

  getWishlist(): void {
    this._wishlistService.getLoggedUserWishlist().subscribe({
      next: (res) => {
        this.wishlistProducts = res.data;
      }
    });
  }

  removeFromWishlist(productId: string): void {
    if (this._authService.isLoggedIn()) {
      this._wishlistService.removeProductFromWishlist(productId).subscribe({
        next: (res) => {
          this.wishlistProducts = this.wishlistProducts.filter(p => p._id !== productId);
          this._toastr.info('Product removed from wishlist');
        },
        error: (err) => this._toastr.error('An error occurred')
      });
    } else {
      this._toastr.warning('Please, Log in first');
    }
  }

  addToCart(productId: string): void {
    if (this._authService.isLoggedIn()) {
      this._cartService.addProductToCart(productId).subscribe({
        next: (res) => {
          console.log(res);
          this._cartService.cartItemCount.next(res.numOfCartItems);
          this.removeFromWishlist(productId);
          this._toastr.success(res.message);
        },
        error: (err) => this._toastr.error('An error occurred')
      });
    } else {
      this._toastr.warning('Please, Log in first');
    }
  }

}