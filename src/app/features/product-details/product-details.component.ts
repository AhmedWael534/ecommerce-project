import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { Product } from '../../core/interfaces/api-models';
import { CommonModule } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import { AuthService } from '../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: Product | null = null;
  productImages: string[] = [];

  wishlistProductIds: string[] = [];

  constructor(
    private _route: ActivatedRoute,
    private _productsService: ProductsService,
    private _cartService: CartService,
    private _authService: AuthService,
    private _toastr: ToastrService,
    private _wishlistService: WishlistService
  ) { }

  ngOnInit(): void {
    const productId = this._route.snapshot.paramMap.get('id');

    if (productId) {
      this._productsService.getSpecificProduct(productId).subscribe({
        next: (res) => {
          this.product = res.data;
          if (this.product) {
            this.productImages = [this.product.imageCover];

            if (res.data.images && Array.isArray(res.data.images)) {
              this.productImages.push(...res.data.images);
            }
          }
        }
      });
    }

    if (this._authService.isLoggedIn()) {
      this._wishlistService.getLoggedUserWishlist().subscribe({
        next: (res) => {
          this.wishlistProductIds = res.data.map((item: Product) => item._id);
        },
        error: (err) => {
          console.error('Error fetching wishlist:', err);
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