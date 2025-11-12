import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Brand } from '../../core/interfaces/api-models';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // 2. استيراد (جديد)

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [CommonModule, RouterModule], // 3. إضافة (جديد)
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {
  brands: Brand[] = [];

  constructor(private _productsService: ProductsService) { } // 4. تعديل

  ngOnInit(): void {
    this._productsService.getAllBrands().subscribe({ // 5. تعديل
      next: (res) => {
        this.brands = res.data;
      }
    });
  }
}