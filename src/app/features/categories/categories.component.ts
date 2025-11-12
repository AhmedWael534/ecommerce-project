import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Category } from '../../core/interfaces/api-models';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { switchMap, of } from 'rxjs';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories: Category[] = [];
  subcategories: any[] = [];

  selectedCategoryName: string = '';
  isLoading: boolean = false;


  constructor(
    private _productsService: ProductsService,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this._route.queryParamMap.pipe(
      switchMap(params => {
        const categoryId = params.get('category');
        const categoryName = params.get('name');

        if (categoryId && categoryName) {
          this.selectedCategoryName = categoryName;
          this.categories = [];
          return this._productsService.getSubcategoriesForCategory(categoryId);
        } else {
          this.selectedCategoryName = '';
          this.subcategories = [];
          return this._productsService.getAllCategories();
        }
      })
    ).subscribe({
      next: (res) => {
        if (this.selectedCategoryName) {
          this.subcategories = res.data;
        } else {
          this.categories = res.data;
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error("Error loading categories:", err);
        this.isLoading = false;
      }
    });
  }

}