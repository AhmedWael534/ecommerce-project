import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Product } from '../../core/interfaces/api-models';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { SeeMorePipe } from '../../shared/pipes/see-more.pipe';
import { SearchPipe } from '../../shared/pipes/search.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  // Make sure to import all needed modules for a standalone component
  imports: [
    CommonModule, 
    RouterModule, 
    SeeMorePipe, 
    SearchPipe, 
    FormsModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  searchTerm: string = '';

  constructor(
    private _productsService: ProductsService,
    private _cartService: CartService
  ) {}

  ngOnInit(): void {
    // Call the service to get products
    this._productsService.getAllProducts().subscribe({
      next: (res) => {
        this.products = res.data;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  // Function to add a product to the cart
  addToCart(productId: string): void {
    this._cartService.addProductToCart(productId).subscribe({
      next: (res) => {
        console.log(res);
        // Update the cart count in the service
        this._cartService.cartItemCount.next(res.numOfCartItems);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}