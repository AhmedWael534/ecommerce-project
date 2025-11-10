import { Component, OnInit } from '@angular/core';
import { BrandsService } from '../../core/services/brands.service';
import { Brand } from '../../core/interfaces/api-models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {
  brands: Brand[] = [];

  constructor(private _brandsService: BrandsService) {}

  ngOnInit(): void {
    this._brandsService.getAllBrands().subscribe({
      next: (res) => {
        this.brands = res.data;
      }
    });
  }
}