import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist.service';
import { Product } from '../../core/interfaces/api-models';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { SeeMorePipe } from '../../shared/pipes/see-more.pipe';

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
    private _cartService: CartService
  ) {}

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
    this._wishlistService.removeProductFromWishlist(productId).subscribe({
      next: (res) => {
        // After removing, filter the product out from the local array
        this.wishlistProducts = this.wishlistProducts.filter(p => p._id !== productId);
      }
    });
  }

  addToCart(productId: string): void {
    this._cartService.addProductToCart(productId).subscribe({
      next: (res) => {
        console.log(res);
        this._cartService.cartItemCount.next(res.numOfCartItems);
        // Remove from wishlist after adding to cart
        this.removeFromWishlist(productId);
      },
    });
  }
}