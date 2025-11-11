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
import { AuthService } from '../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';

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
    private _wishlistService: WishlistService,
    private _authService: AuthService,
    private _toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this._productsService.getAllProducts().subscribe({
      next: (res) => {
        this.products = res.data;
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      }
    });

    if (this._authService.isLoggedIn()) {
      this._wishlistService.getLoggedUserWishlist().subscribe({
        next: (res) => {
          this.wishlistProductIds = res.data.map((item: Product) => item._id);
        },
        error: (err) => {
          console.error('Error fetching wishlist:', err);
          this.wishlistProductIds = [];
        }
      });
    } else {
      this.wishlistProductIds = [];
    }
  }

  addToCart(productId: string): void {
    if (this._authService.isLoggedIn()) {
      this._cartService.addProductToCart(productId).subscribe({
        next: (res) => {
          console.log(res);
          this._cartService.cartItemCount.next(res.numOfCartItems);
          this._toastr.success(res.message);
        },
        error: (err) => {
          console.error(err);
          this._toastr.error('An error occurred');
        }
      });
    } else {
      this._toastr.warning('Please, Log in first');
    }
  }

  toggleWishlist(productId: string): void {
    if (this._authService.isLoggedIn()) {
      if (this.isProductInWishlist(productId)) {
        this._wishlistService.removeProductFromWishlist(productId).subscribe({
          next: (res) => {
            this.wishlistProductIds = res.data;
            this._toastr.info('Product removed from wishlist');
          },
          error: (err) => this._toastr.error('An error occurred')
        });
      } else {
        this._wishlistService.addProductToWishlist(productId).subscribe({
          next: (res) => {
            this.wishlistProductIds = res.data;
            this._toastr.success('Product added to wishlist');
          },
          error: (err) => this._toastr.error('An error occurred')
        });
      }
    } else {
      this._toastr.warning('Please, Log in first');
    }
  }

  isProductInWishlist(productId: string): boolean {
    return this.wishlistProductIds.includes(productId);
  }
}