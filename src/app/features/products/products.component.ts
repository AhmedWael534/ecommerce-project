import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Product } from '../../core/interfaces/api-models';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { SeeMorePipe } from '../../shared/pipes/see-more.pipe';
import { SearchPipe } from '../../shared/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { WishlistService } from '../../core/services/wishlist.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    SeeMorePipe, 
    SearchPipe, 
    FormsModule
  ],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  searchTerm: string = '';
  wishlistProductIds: string[] = [];

  constructor(
    private _productsService: ProductsService,
    private _cartService: CartService,
    private _wishlistService: WishlistService
  ) {}

  ngOnInit(): void {
    this._productsService.getAllProducts().subscribe({
      next: (res) => {
        this.products = res.data;
      },
    });

    this._wishlistService.getLoggedUserWishlist().subscribe({
      next: (res) => {
        this.wishlistProductIds = res.data.map((item: Product) => item._id);
      }
    });
  }

  addToCart(productId: string): void {
    this._cartService.addProductToCart(productId).subscribe({
      next: (res) => {
        console.log(res);
        this._cartService.cartItemCount.next(res.numOfCartItems);
      },
    });
  }

  toggleWishlist(productId: string): void {
    if (this.isProductInWishlist(productId)) {
      this._wishlistService.removeProductFromWishlist(productId).subscribe({
        next: (res) => {
          this.wishlistProductIds = res.data;
        }
      });
    } else {
      this._wishlistService.addProductToWishlist(productId).subscribe({
        next: (res) => {
          this.wishlistProductIds = res.data;
        }
      });
    }
  }

  isProductInWishlist(productId: string): boolean {
    return this.wishlistProductIds.includes(productId);
  }
}