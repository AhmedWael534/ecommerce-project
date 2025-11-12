import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Brand } from '../../core/interfaces/api-models';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {
  brands: Brand[] = [];

  constructor(private _productsService: ProductsService) { }

  ngOnInit(): void {
    this._productsService.getAllBrands().subscribe({
      next: (res) => {
        this.brands = res.data;
      }
    });
  }
}