import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { Product } from '../../core/interfaces/api-models';
import { CommonModule } from '@angular/common';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: Product | null = null;
  // The API doesn't provide multiple images in the "get specific" endpoint, 
  // so we'll use the main image and imageCover for the carousel
  productImages: string[] = [];

  constructor(
    private _route: ActivatedRoute,
    private _productsService: ProductsService,
    private _cartService: CartService
  ) {}

  ngOnInit(): void {
    const productId = this._route.snapshot.paramMap.get('id');
    
    if (productId) {
      this._productsService.getSpecificProduct(productId).subscribe({
        next: (res) => {
          this.product = res.data;
          // Create a simple array for the carousel
          if (this.product) {
            this.productImages = [
              this.product.imageCover, // Main image
              ...res.data.images // API *does* return an images array, perfect!
            ];
          }
        }
      });
    }
  }

  addToCart(productId: string): void {
    this._cartService.addProductToCart(productId).subscribe({
      next: (res) => {
        console.log(res);
        this._cartService.cartItemCount.next(res.numOfCartItems);
      },
    });
  }
}